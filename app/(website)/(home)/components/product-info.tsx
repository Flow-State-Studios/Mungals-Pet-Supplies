'use client';
import { useContext } from 'react';
import styles from '../styles.module.css';
import { variationContext } from '@/app/contexts/choosen-variation';
import Quantity from '@/components/form/quantity';


const ProductInfo = ({product}: any) => {
    const { choosenVariation: variation} = useContext(variationContext);
    
    const dollars = (variation.price_in_cents / 100).toLocaleString("en-US", {style: 'currency', currency:'USD'})
    const variation_size = variation.size_id ? product.sizes.find((size: any) => {
        return size.id === variation.size_id
    }) : null

    return (
        <>
            <h5 className={`${styles.product_title}`}>{product.product_name} ({variation_size.size_in_kg}kg)</h5> 
            <p className={`${styles.product_cost}`}>{dollars} TTD</p>
            <p className={`p-xsmall ${styles.product_stock}`}>In Stock: {variation.in_stock}</p>

            <p className={`${styles.product_description}`}>{product.description}</p>

            <Quantity maxQuantity={variation.in_stock} />

        </>
    )
}

export default ProductInfo;