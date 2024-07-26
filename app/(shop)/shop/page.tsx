import styles from '../styles.module.css';
import Categories from '@/components/categories/categories';
import ProductCard from '@/components/cards/product-card';
import ProductList from '@/components/cards/product-list';
import { createClient } from '@/utils/supabase/server';
import ShopByCategories from '../components/shop-by-category';

const Shop = async ({searchParams}: {searchParams: {page?: string, animal?: string, subcategory?: string}}) => {
    const page = searchParams.page || 1;
    const animal = searchParams.animal || null;
    const subCategory = searchParams.subcategory || null;
    const supabase = createClient();

    let query = supabase.from('product_variations').select(`
        id, price_in_cents, discount_price, thumbnail,
        size:sizes(size_in_kg),
        color:product_colors(color),
        product:products!inner(
            id, product_name,
            thumbnail, animals!inner(name), 
            category:categories!inner(title)
        )
    `)
    if (animal) { query = query.eq('product.animals.name', animal) }
    if (subCategory) { query = query.eq('product.categories.title', subCategory) }

    query = query.limit(20);

    const {data: products, error} = await query;

    if (products == null && error) console.log(error)

    return (
        <div className={`${styles.shop}`}>

            <div className={`${styles.categories_background}`}>
                <Categories />
            </div>

            <div className={`${styles.browse_products}`} id="browse">
                <ShopByCategories />

                <div className={`${styles.products}`}>
                    
                        <div className={`${styles.shop_parameters}`}>
                            <div className={styles.breadcrums}>
                                <p className={`p-xsmall font-caps`}>
                                    Shop 
                                    {   animal 
                                        ?   <>
                                                <span className='p-xsmall'> &gt; </span>
                                                {animal}
                                            </>
                                        : null
                                    }
                                    {   subCategory  
                                        ?   <>
                                                <span className='p-xsmall'> &gt; </span>
                                                {subCategory }
                                            </>
                                        : null
                                    }
                                </p>
                            </div>

                            <p className={`p-xsmall font-caps`}>Page: {page}</p>
                        </div> 
                        {
                            products?.length === 0 
                            ? <div>
                                <p>No Products Found.</p>
                            </div>
                            : <ProductList>
                                { 
                                    products?.map((item, idx) => {
                                    return <>
                                    <ProductCard item={item} key={`${item.id}-${idx}-1`}/>
                                    </>
                                    })
                                }
                        </ProductList> 
                        }
                </div> 
            </div> 
        </div>
    )
}


export default Shop;