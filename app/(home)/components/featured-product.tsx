import { createClient } from '@/utils/supabase/server';
import styles from '../styles.module.css';
import Image from 'next/image';
import Link from 'next/link';


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

    const {data: product, error}: any = await supabase.from('products')
    .select(`
        id, product_name, description, thumbnail, 
        variations:product_variations(id, color, size_in_kg, thumbnail, price_in_cents, quantity_in_stock)`
    ).eq('is_featured', true).single();

    if (!product) throw new Error('No featured Product Found.');
    
    const dollars = (product.variations[0].price_in_cents / 100).toLocaleString("en-US", {style: 'currency', currency:'USD'})

    return <form className={`${styles.featured_product}`}>
        <div className={`${styles.product_imgs}`}>
            <div className={`${styles.img_carousel}`}>
                <div className={`${styles.product_img} ${styles.img_selection}`}>
                    <Image src={`${product.thumbnail}`} fill={true} alt={`${product.description}`}/>
                </div>
                <div className={`${styles.product_img} ${styles.img_selection}`}>
                    <Image src={`${product.thumbnail}`} fill={true} alt={`${product.description}`}/>
                </div>
            </div>

            <div className={`${styles.product_img} ${styles.active_img}`}>
                <Image src={`${product.thumbnail}`} fill={true} alt={`${product.description}`}/>
            </div>
        </div>

        <div className={`${styles.product_info}`}>
            <h5 className={`${styles.product_title}`}>{product.product_name} ({product.variations[0].size_in_kg}kg)</h5> 
            <p className={`${styles.product_cost}`}>{dollars} TTD</p>
            <p className={`p-xsmall ${styles.product_stock}`}>In Stock: {product.variations[0].quantity_in_stock}</p>

            <p className={`${styles.product_description}`}>{product.description}</p>
            {
                product.variations[0].size_in_kg != null 
                ?   <div className={`${styles.options}`}>
                        <p>Sizes:</p>

                        <div className={`${styles.option_btns}`}>
                            {
                                product.variations.map((item: any, idx: number) => {
                                    if(idx === 0) return <button className={`btn-xs`} key={`${product.id}-${item.id}`}>{item.size_in_kg} kgs</button>
                                    return <button className={`btn-secondary btn-xs`} key={`${product.id}-${item.id}`}>{item.size_in_kg} kgs</button>
                                })
                            }
                        </div>
                    </div>
                : null
            }
            {
                product.variations[0].color != null 
                ?   <div className={`${styles.options}`}>
                        <p>Colors:</p>

                        <div className={`${styles.option_btns}`}>
                            {
                                product.variations.map((item: any, idx: number) => {
                                    if(idx === 0) return <button className={`btn-xs`} key={`${product.id}-${item.id}`}>{item.color}</button>
                                    return <button className={`btn-secondary btn-xs`} key={`${product.id}-${item.id}`}>{item.color}</button>
                                })
                            }
                        </div>
                    </div>
                : null
            }
            
            <div className={`${styles.options}`}>
                <p>Quantity:</p>

                <div className={`${styles.option_btns}`}>
                    <div className={`${styles.icon}`}>
                        <Image src={`/minus.svg`} width={14} height={14} alt='Minus'/>
                    </div>

                    <div className={`${styles.quantity_amnt}`}>
                        {1}
                    </div>

                    <div className={`${styles.icon}`}>
                        <Image src={`/plus.svg`} width={14} height={14} alt='Plus'/>
                    </div>
                </div>
            </div>

            {/* <div className={`${styles.options}`}>
                <p>Ingredients: </p>

                <p className={`p-xsmall ${styles.ingredients}`}>Turkey, Chicken, Salmon, Fish Oil, Wheat, Carrots, Peas, Blueberries, Lettuce, Water</p>
            </div> */}

            <div className={`${styles.actions}`}>
                <Link href={`/cart`} className={``}>
                    Buy Now
                </Link>

                <button type='submit' className='btn-secondary'>
                    Add to Cart
                </button>
            </div>
        </div>
    </form>
}


export default FeaturedProduct;