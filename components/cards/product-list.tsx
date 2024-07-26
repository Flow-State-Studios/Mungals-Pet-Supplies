import { ReactNode } from 'react';
import styles from './styles.module.css';


const ProductList = async ({children}: {children: ReactNode}) => {

    return (
        <div className={`${styles.product_list}`}>
            {children}
        </div>
    )
}

export default ProductList;