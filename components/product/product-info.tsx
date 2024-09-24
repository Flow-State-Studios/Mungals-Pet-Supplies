import styles from './styles.module.css';
import ProductQuantity from '../form/product-quantity';

const ProductInfo = ({product}: any) => {
    const price_in_dollars = (product.price_in_cents / 100).toLocaleString("en-US", {style: 'currency', currency:'USD'})
    const discount_price_in_dollars = product.discount_price ? (product.discount_price / 100).toLocaleString("en-US", {style: 'currency', currency:'USD'}) : null
    const variation_size = product.size.id ? product.product_info.sizes.find((size: any) => {
        return size.id === product.size.id
    }) : null

    return (
        <>
            <h5 className={`${styles.product_title}`}>{product.product_info.product_name} ({variation_size ? `${variation_size.size_in_kg} kg` : null})</h5> 
            {
                    discount_price_in_dollars 
                    ?  <div className={`${styles.product_costs}`}>
                            <p className={`${styles.product_discount_cost}`}>{discount_price_in_dollars} TTD</p>
                            <p className={`${styles.product_cost} ${discount_price_in_dollars? styles.product_cost_strikethrough : null}`}>
                                {price_in_dollars} TTD
                            </p>
                        </div>
                    :   <p className={`${styles.product_cost}`}>
                            {price_in_dollars} TTD
                        </p>
                }
            
            <p className={`p-xsmall ${styles.product_stock}`}>In Stock: {product.in_stock}</p>

            <p className={`${styles.product_description}`}>{product.description}</p>

            <ProductQuantity maxQuantity={product.in_stock}/>

        </>
    )
}

export default ProductInfo;