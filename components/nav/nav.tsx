'use client';
import Image from 'next/image';
import Logo from '../logo';
import styles from './styles.module.css';
import { useState } from 'react';
import Menu from './menu';
import Cart from './cart';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const Nav = () => {
    const supabase = createClient();
    const {data: user }: any = supabase.auth.getUser();

    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const activePath = usePathname();

    return <nav className={`${styles.nav}`}>
        <div className={`${styles.nav_mobile}`}>
            <div className={`${styles.icon} ${styles.menu_icon}`} onClick={() => setMenuOpen(prev => !prev)}>
                <Image src={`/menu.svg`} fill={true} alt={'Shopping Cart Bag'}/>
            </div>
                
            <Logo styling={`white`}/>
            
            <div className={`${styles.icon} ${styles.bag_icon}`} onClick={() => setCartOpen(prev => !prev)}>
                <Image src={`/bag.svg`} fill={true} alt={'Shopping Cart Bag'}/>
            </div>

            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
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
                        <Image src={`/bag-dark.svg`} fill={true} alt='Shopping cart logo'/>
                    </div>
                    {
                        user == null 
                        ?   <Link href={`/login`} className='btn btn-sm'>Login</Link>
                        :<div className={`${styles.icon} ${styles.profile_icon}`}>
                        
                        </div>
                    }
                </div>
            </ul> 

        </div>
    </nav>
}


export default Nav