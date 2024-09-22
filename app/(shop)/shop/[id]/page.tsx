import Product from '@/components/product/product';
import styles from '../../styles.module.css';
import { createClient } from '@/utils/supabase/server';

const ProductPage = async ({params, searchParams}: {params: {id: string}, searchParams: {size: string, color: string} }) => {
    const id = params.id;
    const size = searchParams.size || null;
    const color = searchParams.color || null;

    const supabase = createClient();
 
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
    `).eq('products.id', id)

    if(size != null) {
        query = query.eq(`size.size_in_kg`, size)
    }

    if(color !== null) { 
        query = query.eq('product_variations_color_id_fkey.color', color)
    }

    const { data: product, error} = await query.limit(1).single();
    
    if(error) console.log(error)

    return (
        <div className={`${styles.product_page}`}>
            <Product product={product}/>
        </div>
    )
}

export default ProductPage;