import { createClient } from '@/utils/supabase/server';
import styles from '../styles.module.css';
import ProductFeatured from '@/components/product/product-featured';

// export interface Product {
//     id: string,
//     created_at: any,
//     product_name: string,
//     price_in_cents: number,
//     description: string,
//     thumbnail: string,
//     in_stock: number, 
//     is_featured: boolean
// } 
 
const FeaturedProduct = async ({size, color}: {size: string | null, color: string | null}) => {
    const supabase = createClient();

    // const {data: product, error}: any = await supabase.from('products').select(`
    //         id, product_name, description, thumbnail,
    //         sizes(id, size_in_kg),
    //         colors(id, color),
    //         ingredients:product_ingredients(ingredients),
    //         variations:product_variations(
    //             id, price_in_cents, 
    //             in_stock, thumbnail, 
    //             color_id, size_id, discount_price,
    //             available_colors:product_variation_available_colors_product_variation_id_fkey(colors(*))
    //         )
    //         `
    //     ).eq('is_featured', true).limit(1).single();

    //     if (!product) console.log(error)

    let query = supabase.from('product_variations').select(`
        id, product_id, in_stock, price_in_cents, discount_price, 
        thumbnail,
        size:sizes!inner(*),
        color:product_variations_color_id_fkey(*),
        available_colors:product_variation_available_colors_product_variation_id_fkey(colors(*)),
        product_info:products!inner(
            id, product_name, animal_id,
            thumbnail, category_id, description,
            is_featured, 
            sizes(*), 
            colors(*), 
            ingredients:product_ingredients(ingredients)
        )
    `).eq('products.is_featured', true)
       
    if(size != null) {
        query = query.eq(`size.size_in_kg`, size)
    }

    if(color !== null) { 
        query = query.eq('product_variations_color_id_fkey.color', color)
    }

    const { data: product, error} = await query.limit(1).single();
    
    if(error) console.log(error)

    return (
        <div className={`${styles.product_page}`} id='featured'>
            <ProductFeatured product={product} />
        </div>
    )

    // return <form className={`${styles.featured_product}`} >
        
    //     <ChoosenVariation product={product}>

    //         <div className={`${styles.product_imgs}`}>
    //             <div className={`${styles.img_carousel}`}>
    //                 <div className={`${styles.product_img} ${styles.img_selection}`}>
    //                     <Image src={`/purina.png`} fill={true} alt={`${product.description}`}/>
    //                 </div>
    //                 <div className={`${styles.product_img} ${styles.img_selection}`}>
    //                     <Image src={`/purina.png`} fill={true} alt={`${product.description}`}/>
    //                 </div>
    //             </div>

    //             <div className={`${styles.product_img} ${styles.active_img}`}>
    //                 <Image src={`/purina.png`} fill={true} alt={`${product.description}`}/>
    //             </div>
    //         </div>

    //         <div className={`${styles.product_info}`}>
    //             <ProductInfo product={product}/>

    //             {
    //                 product.sizes.length > 0
    //                 ?  <SizeOptions product_id={product.id} sizes={product.sizes}/> 
    //                 : null
    //             }

    //             <ColorOptions product_id={product.id} />  

    //             { product.ingredients != null 
    //                 ? <div className={`${styles.options}`}>
    //                     <p className='p-small'>Ingredients: </p>

    //                     <p className={`p-xsmall ${styles.ingredients}`}>{product.ingredients[0].ingredients}</p>
    //                 </div>
    //                 : null
    //             }

    //                 <div className={`${styles.actions}`}>
    //                     <button type={'submit'} className={`btn btn-secondary`} formAction={buyNow}>
    //                         Buy Now
    //                     </button>

    //                    <AddToCart product={product.id} />
    //                 </div>  
    //         </div>

    //     </ChoosenVariation>
    // </form>
}


export default FeaturedProduct;