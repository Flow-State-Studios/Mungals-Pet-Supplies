'use client';
import Image from 'next/image';
import Logo from '../logo';
import styles from './styles.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import Menu from './menu';
import Cart from './cart';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useCartContext } from '@/app/contexts/shopping-cart';

const DarkNav = () => {
    const supabase = createClient();
    const [scrollPos, setScrollPos] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const menuRef = useRef<HTMLElement | null>(null);
   
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const activePath = usePathname();

    const {shoppingCart} = useCartContext();

    const handleScroll = () => {
        setScrollPos(window.scrollY);
    }

    const getUser = useCallback(async () => {
        const {data: user, error}: any = await supabase.auth.getUser();
        setIsLoading(false)

        if(error) return console.log(error)
    
        setUser(user)
    }, [])

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null)
    }

    useEffect(() => {
       getUser();
    }, [getUser])

    useEffect(() => {
        const scrollListener = document.addEventListener('scroll', handleScroll)

        return () => document.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        if(scrollPos > 10 && menuRef.current?.classList.contains(`${styles.nav_active}`)) return
        if(scrollPos === 0) return menuRef.current?.classList.remove(`${styles.nav_active}`)
        if(scrollPos > 10) return menuRef.current?.classList.add(`${styles.nav_active}`)
    }, [scrollPos])

    return <nav className={`${styles.nav}`} ref={menuRef} >
        
        <div className={`${styles.nav_mobile}`}>
            <div className={`${styles.icon} ${styles.menu_icon}`} onClick={() => setMenuOpen(prev => !prev)}>
                <Image src={`/menu-dark.svg`} fill={true} alt={'Menu Button'}/>
            </div>

            <Logo styling={''} />
            
            <div className={`${styles.icon} ${styles.bag_icon}`} onClick={() => setCartOpen(prev => !prev)}>
                {      
                    shoppingCart.items?.length > 0
                    ? <div className={`${styles.bag_icon_full}`}><h6 className={``}>{shoppingCart.items?.length}</h6></div>
                    : null
                }
                <Image src={`/bag-dark.svg`} fill={true} alt={'Shopping Cart Bag'}/>
            </div>

            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} user={user}/>
        </div>
 
        <div className={`${styles.nav_desktop}`}>
            <div className={`${styles.logo} ${styles.logo_dark}`}>
                <Logo styling={`left`}/>
            </div>

            <ul className={`${styles.nav_container}`}>
                <ul className={`${styles.nav_list}`}>
                    <li> 
                        <Link onClick={() => setMenuOpen(false)} href={`/shop`} className={`${activePath === '/shop' ? `${styles.active_path}` : ''} ${styles.nav_item}`}>
                            Shop
                        </Link></li>
                    <li> 
                        <Link onClick={() => setMenuOpen(false)} href={`/about`} className={`${activePath === '/about' ? `${styles.active_path}` : ''} ${styles.nav_item}`}>
                            About
                        </Link> 
                    </li>
                    <li> 
                        <Link onClick={() => setMenuOpen(false)} href={`/contact`} className={`${activePath === '/contact' ? `${styles.active_path}` : ''} ${styles.nav_item}`}>
                            Contact
                        </Link> 
                    </li>
                </ul>

                <div className={`${styles.icons}`}>
                    <div className={`${styles.icons}`}>
                        <div className={`${styles.icon} ${styles.bag_icon}`}>
                            {
                                shoppingCart.items?.length > 0
                                ? <div className={`${styles.bag_icon_full}`}><h6 className='font-accent-secondary'>{shoppingCart.items?.length}</h6></div>
                                : null
                            }
            
                            <Image src={`/bag-dark.svg`} fill={true} alt='Shopping cart logo' onClick={() => setCartOpen(prev => !prev)}/>
                        </div>

                        { isLoading === true ? null : user === null || user.is_anonymous === true
                            ?  <Link href={`/login`} className='btn btn-sm'>Login</Link>
                            : <div className={`${styles.icon} ${styles.profile_icon}`}>
                                <Image src={'/paw.svg'} alt={`Paw print profile picture`} width={32} height={32}/>
                                <div className={`${styles.profile_menu_container}`}>  
                                    <div className={`${styles.profile_menu}`}>
                                        <Link href={`/profile`} className={`${styles.profile_menu_option}`}>My Profile</Link>
                                        <div className={`${styles.profile_menu_option}`} onClick={() => logout()}>Logout</div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </ul> 
        </div>
        
        <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </nav>
}


export default DarkNav;