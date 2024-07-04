'use client';
import Link from 'next/link';
import styles from './styles.module.css';
import { usePathname } from 'next/navigation';

const Menu = ({menuOpen, setMenuOpen}: any) => {
   const activePath = usePathname();

   // const navigatePath = (e: any, path: string) => {
   //    e.preventDefault();

   //    setMenuOpen(false)
   // }

    return <div className={`${styles.menu} ${menuOpen ? `${styles.menu_open}` : ''}`}>
         <header className={`${styles.menu_header}`}>
            <h3 className={`${styles.header}`}>Menu</h3>
         </header>

         <ul className={`${styles.nav_list}`}>
            <li> <Link onClick={() => setMenuOpen(false)} href={`/`} className={`${activePath === '/' ? `${styles.active_path}` : ''} ${styles.nav_item}`}>Home</Link></li>
            <li> <Link onClick={() => setMenuOpen(false)} href={`/shop`} className={`${activePath === '/shop' ? `${styles.active_path}` : ''} ${styles.nav_item}`}>Shop</Link></li>
            <li> <Link onClick={() => setMenuOpen(false)} href={`/about`} className={`${activePath === '/about' ? `${styles.active_path}` : ''} ${styles.nav_item}`}>About</Link> </li>
            <li> <Link onClick={() => setMenuOpen(false)} href={`/contact`} className={`${activePath === '/contact' ? `${styles.active_path}` : ''} ${styles.nav_item}`}>Contact</Link> </li>
         </ul>

         <button className={`${styles.menu_close}`} onClick={() => setMenuOpen(false)}>
            Close Menu
        </button>
    </div>
}


export default Menu;