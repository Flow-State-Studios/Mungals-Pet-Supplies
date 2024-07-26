import { createClient } from '@/utils/supabase/server';
import styles from '../styles.module.css';
import Image from 'next/image';
import SizeOptions from '@/components/form/size-options';
import ColorOptions from '@/components/form/color-options';
import ChoosenVariation from '@/app/contexts/choosen-variation';
import ProductInfo from './product-info';
import AddToCart from '@/components/buttons/add-to-cart';

export interface Product {
    id: string,
    created_at: any,
    product_name: string,
    price_in_cents: number,
    description: string,
    thumbnail: string,
    in_stock: number, 
    is_featured: boolean
} 

const FeaturedProduct = async () => {
    const supabase = createClient();
    const currentUser = await supabase.auth.getUser();

    const {data: product, error}: any = await supabase.from('products').select(`
            id, product_name, description, thumbnail,
            sizes(id, size_in_kg),
            colors:product_colors(id, color),
            ingredients:product_ingredients(ingredients),
            variations:product_variations(id, price_in_cents, in_stock, thumbnail, color_id, size_id, discount_price)
            `
        ).eq('is_featured', true).limit(1).single();

        if (!product) throw new Error(`No featured Product Found: ${error}`);
        console.log(product)
    
    const buyNow = async (formData: FormData) => {
        'use server'

        const quantity = formData.get('quantity')?.valueOf();
        const size = formData.get('size')?.valueOf();
        const color =  formData.get('color')?.valueOf();

        const order = {
            customer_id: currentUser.data.user?.id,
            shipping_address_id: 'deliver_id' || 'store pick-up',
            payment_option_id: 'payment_option' || 'Cash on Delivery',
            status: 'Order',
            orderTotal: ''
        }

        const orderProduct = {
            product_id: product.id,
            size: size,
            color: color,
            quantity: quantity,
            price_in_cents: 8000,
            discount_price: null,
        }

        const { error: order_products_error } = await supabase.from('order_products').insert({
            product_id: product.id,
            size: size,
            color: color,
            quantity: quantity,
            price_in_cents: 8000,
        })
    }

    return <form className={`${styles.featured_product}`} action={buyNow}>
        <ChoosenVariation product={product}>

            <div className={`${styles.product_imgs}`}>
                <div className={`${styles.img_carousel}`}>
                    <div className={`${styles.product_img} ${styles.img_selection}`}>
                        <Image src={`/purina.png`} fill={true} alt={`${product.description}`}/>
                    </div>
                    <div className={`${styles.product_img} ${styles.img_selection}`}>
                        <Image src={`/purina.png`} fill={true} alt={`${product.description}`}/>
                    </div>
                </div>

                <div className={`${styles.product_img} ${styles.active_img}`}>
                    <Image src={`/purina.png`} fill={true} alt={`${product.description}`}/>
                </div>
            </div>

            <div className={`${styles.product_info}`}>
                <ProductInfo product={product}/>

                {
                    product.sizes.length > 0
                    ?  <SizeOptions product_id={product.id} sizes={product.sizes}/> 
                    : null
                }

                {
                    product.colors.length > 0
                    ?   <ColorOptions product_id={product.id} colors={product.colors} />
                    : null
                }

                { product.ingredients != null 
                    ? <div className={`${styles.options}`}>
                        <p className='p-small'>Ingredients: </p>

                        <p className={`p-xsmall ${styles.ingredients}`}>Turkey, Chicken, Salmon, Fish Oil, Wheat, Carrots, Peas, Blueberries, Lettuce, Water</p>
                    </div>
                    : null
                }

                    <div className={`${styles.actions}`}>
                        <button type={'submit'} className={`btn btn-secondary`}>
                            Buy Now
                        </button>

                       <AddToCart product={product.id} />
                    </div>  
            </div>

        </ChoosenVariation>
    </form>
}


export default FeaturedProduct;