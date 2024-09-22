'use client';
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export const variationContext = createContext<any>(null);

const ChoosenVariation = ({product, children}: {product: any, children: ReactNode}) => {
    const [choosenVariation, setChoosenVariation ] = useState(product.variations[0]);
    const [size, setSize] = useState(product.sizes[0] || null);
    const [color, setColor] = useState(product.colors[0] || null);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        product.variations.forEach((variation: any) => {
            console.log(variation.color_id)
            if(variation.color_id === color && variation.size_id === size) return setChoosenVariation(variation)
        })
    }, [size, color])

    return (
        <variationContext.Provider value={{choosenVariation, setChoosenVariation, setSize, setColor, quantity, setQuantity}}>
            <input type={'text'} hidden={true} name="quantity" defaultValue={quantity}/>
            <input type={'text'} hidden={true} name="product_id" defaultValue={product.id}/>
            <input type={'text'} hidden={true} name="variation_id" defaultValue={choosenVariation.id}/>
            <input type={'text'} hidden={true} name="variation_unit_price" defaultValue={choosenVariation.discount_price ? choosenVariation.discount_price : choosenVariation.price_in_cents}/>
            { children }
        </variationContext.Provider>
    )
}

export const useVariationContext = () => useContext(variationContext);

export default ChoosenVariation;