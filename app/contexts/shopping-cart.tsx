'use client';
import { createClient } from "@/utils/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext<any>(null);

export interface CartItem {
    product: any,
    variation: any,
    name: string,
    size?: number,
    color?: string,
    quantity: number,
    price_in_cents: number,
    discount_price: number | null
}

const ShoppingCart = ({children}: {children: ReactNode}) => {
    const [shoppingCart, setShoppingCart] = useState<any>({});
    const supabase = createClient();
    
    const fetchCartData = async () => {
        const {data, error}: any = await supabase.from('shopping_cart').select(`
            *, 
            items:shopping_cart_items(
                id,
                product:products(
                    id, 
                    product_name, 
                    thumbnail
                ),
                variation:product_variations(
                    id, 
                    color:product_colors(color), 
                    size:sizes(size_in_kg),
                    price_in_cents,
                    discount_price,
                    in_stock
                ),
                quantity
            )
        `).eq('user_id', `82b26495-0701-4dec-a0ff-11fc225be95f`).limit(1).single()

        if(error) throw new Error(error)
        setShoppingCart(data)
    }

    //Fetch Cart Items
    useEffect(() => {
        fetchCartData().catch((err) => console.log(err))
    }, [])

    const addCartItem = async (cartItem: any) => {
        const {data, error} = await supabase.from('shopping_cart_items').insert({
            cart_id: shoppingCart.id,
            variation_id: cartItem.variation_id,
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
        }).select()

        await fetchCartData();
    }

    const removeCartItem = async (cartItemId: string) => {
        const res = await supabase.from('shopping_cart_items').delete().eq('id', cartItemId);

        if (res.error != null) throw new Error(`${res.error}`)

        const cartItems = shoppingCart.items.filter((item: any) => {
            return item.id !== cartItemId
        })

        setShoppingCart((prev: any) => ({...prev, items: [...cartItems]}))
    }


    const updateTotalCost = () => {
        let totalCost = 0;

        shoppingCart.items.forEach((item: CartItem) => {
            let itemTotal = 0;

            item.variation?.discount_price == null
            ? itemTotal = item.quantity * item.variation.price_in_cents
            : itemTotal = item.quantity * item.variation.discount_price

            totalCost = totalCost + itemTotal
        })


    }   


    return (
        <CartContext.Provider value={{shoppingCart, addCartItem, removeCartItem, updateTotalCost}}>
              { children }
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext);

export default ShoppingCart;