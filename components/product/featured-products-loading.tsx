import styles from './styles.module.css';

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

const FeaturedProductLoading = async () => {
 
    return <div className={`${styles.featured_product}`}>
        <div className={`${styles.product_imgs}`}>
            <div className={`${styles.img_carousel}`}>
                <div className={`${styles.product_img} ${styles.img_selection}`}>
                    
                </div>
                <div className={`${styles.product_img} ${styles.img_selection}`}>
                    
                </div>
            </div>

            <div className={`${styles.product_img} ${styles.active_img}`}>
                
            </div>
        </div>

        <div className={`${styles.product_loading}`}>
            <div className={`${styles.load_bar}`}></div>
            <p className={`font-italic ${styles.load_qoute}`}>We strive to increase the quality of life of pets in Trinidad & Tobago.</p>
        </div>
    </div>
}


export default FeaturedProductLoading;