'use client';
import Link from 'next/link';
import styles from './styles.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';

const Menu = ({menuOpen, setMenuOpen, user}: any) => {
   const activePath = usePathname();
   const supabase = createClient()
   const router = useRouter();
   // const navigatePath = (e: any, path: string) => {
   //    e.preventDefault();

   //    setMenuOpen(false)
   // }

   const Logout = async () => {
      setMenuOpen(false)
      await supabase.auth.signOut();
      router.push('/login')
   }

    return <div className={`${styles.menu} ${menuOpen ? `${styles.menu_open}` : ''}`}>
         <header className={`${styles.menu_header}`}>
            <h3 className={`${styles.header}`}>Menu</h3>
         </header>

         <ul className={`${styles.nav_list}`}>
            <li> <Link onClick={() => setMenuOpen(false)} href={`/`} className={`${activePath === '/' ? `${styles.active_path}` : ''} ${styles.nav_item}`}>Home</Link></li>
            <li> <Link onClick={() => setMenuOpen(false)} href={`/shop`} className={`${activePath === '/shop' ? `${styles.active_path}` : ''} ${styles.nav_item}`}>Shop</Link></li>
            <li> <Link onClick={() => setMenuOpen(false)} href={`/about`} className={`${activePath === '/about' ? `${styles.active_path}` : ''} ${styles.nav_item}`}>About</Link> </li>
            <li> <Link onClick={() => setMenuOpen(false)} href={`/contact`} className={`${activePath === '/contact' ? `${styles.active_path}` : ''} ${styles.nav_item}`}>Contact</Link> </li>
            {
               user 
               ? <li className={`${styles.nav_item}`} onClick={() => Logout()}>Logout</li>
               : <li> <Link onClick={() => setMenuOpen(false)} href={`/login`} className={`${activePath === '/login' ? `${styles.active_path}` : ''} ${styles.nav_item}`}>Login</Link> </li>
            }
         </ul>

         <div className={`${styles.menu_close}`}>
            <button className={`btn-outlined`} onClick={() => setMenuOpen(false)}>
               Close Menu
            </button>
            { user != null
               ?  <div className={`${styles.icon} ${styles.profile_icon}`}>
                     <Link href={'/profile'}>
                        <Image src={'/paw.svg'} alt={`Paw print profile picture`} width={32} height={32}/>
                     </Link>
                  </div>
               : null
            }
         </div>
         
    </div>
}


export default Menu;