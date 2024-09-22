'use client';
import Link from "next/link";
import styles from '../../styles.module.css';
import { usePathname } from "next/navigation";

const ProfileNav = () => {
    const active_path = usePathname();

    console.log(active_path);

    return (
        <nav className={`${styles.profile_nav}`}>
            <ul className={`${styles.profile_nav_list}`}>
                <li className={`${styles.profile_nav_item}`}><Link href={'/profile'}>Profile Settings</Link></li>
                <li className={`${styles.profile_nav_item}`}><Link href={'/profile/addresses'}>My Addresses</Link></li>
                <li className={`${styles.profile_nav_item}`}><Link href={'/profile/orders'}>My Orders</Link></li>
            </ul>
        </nav>
    )
}


export default ProfileNav;