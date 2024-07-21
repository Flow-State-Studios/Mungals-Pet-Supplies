'use client';
import Image from 'next/image';
import Logo from '../logo';
import styles from './styles.module.css';
import { useEffect, useRef, useState } from 'react';
import Menu from './menu';
import Cart from './cart';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useCartContext } from '@/app/contexts/shopping-cart';

const Nav = () => {
    const [scrollPos, setScrollPos] = useState(0);
    const [user, setUser] = useState<User | null>(null);
    const menuRef = useRef<HTMLElement | null>(null);
   
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const activePath = usePathname();

    const {shoppingCart} = useCartContext();

    const handleScroll = () => {
        setScrollPos(window.scrollY);
    }

    useEffect(() => {
       async () => {
            const supabase = createClient();
            const {data: user, error}: any = await supabase.auth.getUser();
            if(error) return console.log(error)
        }
        
        setUser(user)
    }, [])

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
                <Image src={`/${scrollPos > 10 ? 'menu-dark.svg' : 'menu.svg'}`} fill={true} alt={'Shopping Cart Bag'}/>
            </div>

            {
                scrollPos > 10 
                ? <Logo styling={''} />
                : <Logo styling={'white'} />
            }
            
            <div className={`${styles.icon} ${styles.bag_icon}`} onClick={() => setCartOpen(prev => !prev)}>
                {      
                    shoppingCart.items?.length > 0
                    ? <div className={`${styles.bag_icon_full}`}><h6 className='white'>{shoppingCart.items?.length}</h6></div>
                    : null
                }
                <Image src={`/${scrollPos > 10 ? `bag-dark.svg` : `bag.svg`}`} fill={true} alt={'Shopping Cart Bag'}/>
            </div>

            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        </div>
 
        <div className={`${styles.nav_desktop}`}>
            <div className={`${styles.logo}`}>
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
                    <div className={`${styles.icon} ${styles.bag_icon}`}>
                        {
                            shoppingCart.items?.length > 0
                            ? <div className={`${styles.bag_icon_full}`}><h6 className='font-accent-secondary'>{shoppingCart.items?.length}</h6></div>
                            : null
                        }
        
                        <Image src={`/bag-dark.svg`} fill={true} alt='Shopping cart logo' onClick={() => setCartOpen(prev => !prev)}/>
                    </div>
                    {
                        user == null 
                        ?   <Link href={`/login`} className='btn btn-sm'>Login</Link>
                        : <div className={`${styles.icon} ${styles.profile_icon}`}>
                        
                        </div>
                    }
                </div>
            </ul> 
        </div>
        
        <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </nav>
}


export default Nav