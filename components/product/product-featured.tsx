import styles from './styles.module.css';
import Image from 'next/image';
import ProductInfo from './product-info';
import AddToCart from '@/components/buttons/add-to-cart';
import { buyNow } from '@/actions';
import FeaturedSizeOptions from '../form/featured-size-options';
import FeaturedColorOptions from '../form/featured-color-options';

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

const ProductFeatured = async ({product}: {product: any}) => {
    const base_product = product.product_info;

    return <form className={`${styles.featured_product}`}>  
            <input type={'text'} hidden={true} name="product_id" defaultValue={base_product.id}/>
            <input type={'text'} hidden={true} name="variation_id" defaultValue={product.id}/>
            <input type={'text'} hidden={true} name="variation_unit_price" defaultValue={product.discount_price ? product.discount_price : product.price_in_cents}/> 

            <div className={`${styles.product_imgs}`}>
                <div className={`${styles.img_carousel}`}>
                    <div className={`${styles.product_img} ${styles.img_selection}`}>
                        <Image src={`/purina.png`} fill={true} alt={`${base_product.description}`}/>
                    </div>
                    <div className={`${styles.product_img} ${styles.img_selection}`}>
                        <Image src={`/purina.png`} fill={true} alt={`${base_product.description}`}/>
                    </div>
              </div>

                <div className={`${styles.product_img} ${styles.active_img}`}>
                    <Image src={`/purina.png`} fill={true} alt={`${base_product.description}`}/>
                </div>
            </div>

            <div className={`${styles.product_info}`}>
                <ProductInfo product={product}/>

                {
                    base_product.sizes.length > 0
                    ?  <FeaturedSizeOptions product_id={product.product_id} variation_size={product.size} available_sizes={base_product.sizes}/>
                    : null
                }

                {
                    product.available_colors.length > 0 
                    ? <FeaturedColorOptions product_id={product.product_id} variation_color={product.color} available_colors={product.available_colors}/>
                    : null
                }

                { base_product.ingredients.length > 0 || !!base_product.ingredients[0]
                    ? <div className={`${styles.options}`}>
                        <p className='p-small'>Ingredients: </p>

                        <p className={`p-xsmall ${styles.ingredients}`}>{base_product.ingredients[0].ingredients}</p>
                    </div>
                    : null
                }

                    <div className={`${styles.actions}`}>
                        <button type={'submit'} className={`btn btn-secondary`} formAction={buyNow}>
                            Buy Now
                        </button>

                       {/* <AddToCart product={product.id} /> */}
                    </div>  
            </div>
    </form>
}

export default ProductFeatured;