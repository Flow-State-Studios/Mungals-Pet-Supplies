'use client';
import Link from 'next/link';
import styles from './styles.module.css';
import Image from 'next/image';

const Cart = ({cartOpen, setCartOpen}: any) => {
    return <div className={`${styles.menu} ${cartOpen ? `${styles.cart_open}` : ''}`}>
         <header className={`${styles.menu_header}`}>
            <h3 className={`${styles.header}`}>Shopping Cart</h3>
         </header>

        <ul className={`${styles.cart_list}}`}>
            <li className={`${styles.cart_item}`}>

            </li>
        </ul>

         <Link href={'/'} className={`btn btn-secondary ${styles.checkout_link}`} onClick={() => setCartOpen((prev: boolean) => !prev)}>
            Continue to Checkout
        </Link>

        <button className={`${styles.menu_close}`} onClick={() => setCartOpen((prev: boolean) => !prev)}>
            Close Cart
        </button>


    </div>
}


export default Cart;