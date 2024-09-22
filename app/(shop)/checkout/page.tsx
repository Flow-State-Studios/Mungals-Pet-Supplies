'use client';
import Link from 'next/link';
import { useCartContext } from '../../contexts/shopping-cart';
import styles from './styles.module.css';
import Image from 'next/image';
import { confirmOrder } from '@/actions';
import { useFormState } from 'react-dom';
import ConfirmOrder from '@/components/buttons/confirm-order';

const Checkout = ({searchParams}: {searchParams: {message: string}}) => {
    const message = searchParams.message;
    const [state, form_action] = useFormState(confirmOrder, null)
  
    const {shoppingCart, removeCartItem, addQuantity, subtractQuantity} = useCartContext();
    const formatter = Intl.NumberFormat('en-us', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
 
    const subtotal = formatter.format(shoppingCart.subtotal/100);
    return (
        <form className={`${styles.checkout_layout}`} action={form_action}>
            {
                shoppingCart.items ? shoppingCart.items.map((item: any) => {
                    const product = {
                        quantity: item.quantity,
                        product_id: item.product.id,
                        variation_id: item.variation.id,
                    } 
                    return (
                        <input type='text' name='item' value={JSON.stringify(product)} hidden={true} readOnly={true}/>
                    )
                })
                : null
            }
 
            <input type='text' name='order_total' defaultValue={`${shoppingCart.subtotal}`} hidden={true} readOnly={true}/>

            <div className={`${styles.checkout_items_list}`}>
                {/* <header className={`${styles.checkout_header}`}>
                    <h4>Checkout Items</h4>
                </header> */}
                {
                    shoppingCart.items?.length === 0 
                    ?
                    <div className={`${styles.empty_cart}`}>
                        <p className='p-large'>Your shopping cart is empty.</p>
                        <Link href={`/shop`} className={`btn btn-sm`}>Shop Now</Link>
                    </div>
                    :
                    shoppingCart.items?.map((item: any, idx: number) => {
                        return <div className={`${styles.cart_item}`} key={`${item.product.product_id}-${item.variation.variation_id}-${idx}`}>
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
                                    <button className='btn_icon btn_icon-sm' type='button'  onClick={() => subtractQuantity(item.id, item.quantity, item.variation.price_in_cents, item.variation.discount_price)}>
                                        <div>
                                            <Image src={`/minus.svg`} width={16} height={16} alt='minus sign'/>  
                                        </div>
                                    </button>

                                    <p className={`${styles.quantity_amnt}`}>{item.quantity}</p>

                                    <button className='btn_icon btn_icon-sm' type='button' onClick={() => addQuantity(item.id, item.quantity, item.variation.price_in_cents, item.variation.discount_price)}>
                                        <div>
                                            <Image src={`/plus.svg`} fill={true} alt='plus sign'/>  
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <p className={`${styles.remove}`} onClick={() => removeCartItem(item.id, item.quantity, item.variation.price_in_cents, item.variation.discount_price)}>remove item</p>
                        </div>
                    </div>
                    })
                }
            </div>

            <div className={`${styles.checkout_items_total}`}>
                {/* <h4>Cart Total</h4> */}
                <div className={`${styles.cart_info}`}>
                    <p className={`p-small`}>Cart Items:</p>
                    <p className={`p-small`}>{shoppingCart.items?.length} Items</p>
                </div>

                <div className={`${styles.cart_info}`}>
                    <p className={`p-small`}>Subtotal:</p>
                    <p className={`p-small`}>${subtotal ? subtotal : '00.00'} TTD</p>
                </div>

                <ConfirmOrder state={state ? state : message}/>
            </div>
        </form>
    )
}

export default Checkout;