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
            if(variation.color_id === color && variation.size_id === size) return setChoosenVariation(variation)
        })
    }, [size, color])

    return (
        <variationContext.Provider value={{choosenVariation, setChoosenVariation, setSize, setColor, quantity, setQuantity}}>
            { children }
        </variationContext.Provider>
    )
}

export const useVariationContext = () => useContext(variationContext);

export default ChoosenVariation;