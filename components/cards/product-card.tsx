import Image from 'next/image';
import styles from './styles.module.css';
import Link from 'next/link';

const ProductCard = ({item}: any) => {
    const isDiscount = item.discount_price != null ? true : false;

    return (
        <Link href={`/shop/${item.product.id}?size=${item.size?.size_in_kg}&color=${item.color?.color}`} className={`${styles.product_card}`}>
            <div className={`${styles.product_img}`}>
                <Image src={`${item.thumbnail ? item.thumbnail : '/purina.png'}`} fill={true} alt={'Product image'}/>
            </div>

            <p className={`${styles.product_title}`}>
                {
                    item.color != null
                    ? <span className={`${styles.product_color_variation}`}>({item.color.color}) </span>
                    : null
                }

                {item.product.product_name} 

                {
                    item.size != null
                    ? <span className={`${styles.product_size_variation}`}> ({item.size.size_in_kg}kgs)</span>
                    : null
                }
                </p>

                {
                    isDiscount 
                    ?  <div className={`${styles.product_costs}`}>
                            <p className={`${styles.product_discount_cost}`}>${item.discount_price/100} TTD</p>
                            <p className={`${styles.product_cost} ${isDiscount ? styles.product_cost_strikethrough : null}`}>
                                ${item.price_in_cents/100} TTD
                            </p>
                        </div>
                    :   <p className={`${styles.product_cost}`}>
                            ${item.price_in_cents/100} TTD
                        </p>
                }
        </Link>
    )
}

export default ProductCard;