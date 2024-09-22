'use client';
import Link from 'next/link';
import styles from './styles.module.css';
import Image from 'next/image';
import { useCartContext } from '@/app/contexts/shopping-cart';

const Cart = ({cartOpen, setCartOpen}: any) => {

    const { shoppingCart, addQuantity, subtractQuantity, removeCartItem} = useCartContext();

    return <div className={`${styles.cart} ${cartOpen ? `${styles.cart_open}` : ''}`}>
         <header className={`${styles.menu_header}`}>
            <button className={`btn_icon`} onClick={() => {setCartOpen(false)}}>
                <div>
                    <Image src={'/close.svg'} fill={true} alt='Close'/>
                </div>
            </button>
            <h4 className={`${styles.header}`}>Shopping Cart</h4>
            
            {/* <p className='p-xsmall font-accent-secondary'>Total: ${shoppingCart.subtotal/100}.00</p> */}
         </header>
        
        <ul className={`${styles.cart_list}`}>
            {
                shoppingCart.items?.map((item: any, idx: number) => {
                    return <li className={`${styles.cart_item}`} key={`${item.product.product_id}-${item.variation.variation_id}-${idx}`}>
                        <div className={`${styles.product_img}`}> 
                            <Image src={`${item.thumbnail != null ? `${item.thumbnail}` : `${item.product.thumbnail}`}`} fill={true} alt={'product image'} />
                        </div>

                        <div className={`${styles.product_details}`}>
                            <h5 className={`p-small`}>{item.product.product_name} ({item.variation.size.size_in_kg}kg)</h5>
                            <p className={`p-xsmall price`}>
                                ${item.variation.price_in_cents/100} TTD 
                            </p>

                            <div className={`${styles.product_stock_info}`}>
                                <span className={`p-xsmall stock`}>{item.variation.in_stock} in stock</span>

                                <div className={`${styles.actions}`}>
                                    <button className='btn_icon btn_icon-sm' onClick={() => subtractQuantity(item.id, item.quantity, item.variation.price_in_cents, item.variation.discount_price)}>
                                        <div>
                                            <Image src={`/minus.svg`} fill={true} alt='minus sign'/>  
                                        </div>
                                    </button>
                                    <p className={`${styles.quantity_amnt}`}>{item.quantity}</p>
                                    <button className='btn_icon btn_icon-sm' onClick={() => addQuantity(item.id, item.quantity, item.variation.price_in_cents, item.variation.discount_price)}>
                                        <div>
                                            <Image src={`/plus.svg`} fill={true} alt='plus sign'/>  
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <p className={`${styles.remove}`} onClick={() => removeCartItem(item.id, )}>remove item</p>
                        </div>
                    </li>
                })
            }
        </ul>
        
         <Link href={'/checkout'} className={`btn ${styles.checkout_link}`} onClick={() => setCartOpen((prev: boolean) => !prev)}>
            Continue to Checkout
        </Link>

        <button className={`${styles.menu_close} btn-outlined`} onClick={() => setCartOpen((prev: boolean) => !prev)}>
            Close Cart
        </button>
    </div>
}


export default Cart;