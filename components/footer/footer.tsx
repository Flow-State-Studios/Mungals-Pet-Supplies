import Link from 'next/link';
import styles from './styles.module.css';


const Footer = () => {
    return (
        <footer className={`${styles.footer}`}>
            <h1 className={`${styles.h1__lg}`}>Mungal's</h1>

            <div className={`${styles.footer_ul_list}`}>
                <ul className={`${styles.list}`}>
                    <h6 className={`${styles.list_header}`}>Shop</h6>
                    <li className={`${styles.list_item}`}><Link href={'/shop?animal=dogs'}>Dog Supplies</Link></li>
                    <li className={`${styles.list_item}`}><Link href={'/shop?animal=cats'}>Cat Supplies</Link></li>
                    <li className={`${styles.list_item}`}><Link href={'/shop?animal=birds'}>Bird Supplies</Link></li>
                    <li className={`${styles.list_item}`}><Link href={'/shop?animal=fish'}>Fish Supplies</Link></li>
                    <li className={`${styles.list_item}`}><Link href={'/shop?animal=small pets'}>Small Pets Supplies</Link></li>
                </ul>

                <ul className={`${styles.list}`}>
                    <h6 className={`${styles.list_header}`}>Contact</h6>
                    <li className={`${styles.list_item}`}>mungas@</li>
                    <li className={`${styles.list_item}`}>123-234-2342</li>
                </ul>

                <ul className={`${styles.list}`}>
                    <h6 className={`${styles.list_header}`}>Legal</h6>
                    <li className={`${styles.list_item}`}><Link href={'/legal/privacy'}>Privacy Policy</Link></li>
                    <li className={`${styles.list_item}`}><Link href={'/legal/terms'}>Terms & Conditions</Link></li>
                </ul>
                
                <ul className={`${styles.list}`}>
                    <h6 className={`${styles.list_header}`}>About</h6>
                    <li className={`${styles.list_item}`}><Link href={'/about'}>About</Link></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;