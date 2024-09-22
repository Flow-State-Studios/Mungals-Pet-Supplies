import Link from 'next/link';
import styles from './styles.module.css';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { RetryOrder } from '@/actions';

const PaymentConfirmationPage = async ({searchParams}: {searchParams: any}) => {
    const supabase = createClient();
    const {data: {user}, error} = await supabase.auth.getUser();
    
    const { order_id, status } = searchParams;

    if(!order_id || status == undefined) redirect('/checkout?message=there was an error processing your payment. Please try again.')

    const {data: order, error: order_error} = await supabase.from('orders').select(`
        *,
        products:order_products(
            *,
            product:products(*),
            variation:product_variations(
                *,
                size:sizes(*),
                color:product_colors(*)
            )
        ),
        address:delivery_addresses(*)
    `).eq('id', order_id).limit(1).single();

    const formatter = Intl.NumberFormat('en-Us', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

    if(status === 'error' || status === 'failed') return (
        <form className={`${styles.page_container}`} action={RetryOrder}>
            <input type='text' name='order_id' defaultValue={order_id} readOnly={true} hidden={true} />

              <div className={`${styles.confirmation}`}>
                <Image src={'/error.svg'} width={500} height={500} alt='There was an error with your payment.'/>
            </div>

            <div className={`${styles.order_info}`}>
                <h2>Something Went Wrong!</h2>
                <p>There was an error processing your payment of ${formatter.format(order.order_total/100)} TTD for Order: #{order.id}.</p>
            </div>

            <div className={`${styles.actions}`}>
                <button type='submit' className={`btn`}>Retry Order</button>
            </div>

            <div className={`${styles.order}`}>
             
                {
                    order?.products ?
                        order.products.map((item: any, idx: number) => {
                            console.log(item.variation);
                            return <div className={`${styles.cart_item}`} key={`${item.product.product_id}-${item.variation.variation_id}-${idx}`}>
                                <div className={`${styles.product_img}`}> 
                                    <Image src={`${item.variation.thumbnail != null ? `${item.variation.thumbnail}` : `${item.product.thumbnail}`}`} fill={true} alt={'product image'} />
                                </div>

                                <div className={`${styles.product_details}`}>
                                    <h5 className={`p-small`}>{item.product.product_name} ({item.variation.size.size_in_kg}kg)</h5>
                                    <p className={`p-xsmall price`}>
                                        ${item.variation.price_in_cents/100} TTD 
                                    </p>

                                    <div className={`${styles.product_stock_info}`}>
                                        <div className={`${styles.actions}`}>
                                            <p className={`${styles.quantity_amnt}`}>{item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    })
                    : null
                }
             </div>   
        </form>
    )
    
    return (
        <div className={`${styles.page_container}`}>
            <div className={`${styles.confirmation}`}>
                <Image src={'/confirmed.svg'} width={500} height={500} alt='Confirmation icon to show that your order was succcessful'/>
            </div>

            <div className={`${styles.order_info}`}>
                <h1>Order Confirmed!</h1>
                <p>Your payment of ${formatter.format(order.order_total/100)} TTD for Order: #{order.id} has been approved.</p>
            </div>

            <div className={`${styles.actions}`}>
                {/* <Link className={`btn btn-sm btn-outlined`} href={`/order/${order_id}`}>View Order</Link> */}
                <Link className={`btn`} href={`/shop`}>Continue Browsing</Link>
            </div>

            <div className={`${styles.order}`}>
             
                {
                    order?.products ?
                        order.products.map((item: any, idx: number) => {
                            console.log(item.variation);
                            return <div className={`${styles.cart_item}`} key={`${item.product.product_id}-${item.variation.variation_id}-${idx}`}>
                                <div className={`${styles.product_img}`}> 
                                    <Image src={`${item.variation.thumbnail != null ? `${item.variation.thumbnail}` : `${item.product.thumbnail}`}`} fill={true} alt={'product image'} />
                                </div>

                                <div className={`${styles.product_details}`}>
                                    <h5 className={`p-small`}>{item.product.product_name} ({item.variation.size.size_in_kg}kg)</h5>
                                    <p className={`p-xsmall price`}>
                                        ${item.variation.price_in_cents/100} TTD 
                                    </p>

                                    <div className={`${styles.product_stock_info}`}>
                                        <div className={`${styles.actions}`}>
                                            <p className={`${styles.quantity_amnt}`}>{item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    })
                    : null
                }
             </div>   
        </div>
    )
}


export default PaymentConfirmationPage;