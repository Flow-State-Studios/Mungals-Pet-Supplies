'use client';
import { getUserOrSignInAnon } from "@/actions";
import { createClient } from "@/utils/supabase/client";
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
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    const getUser = async () => {
        const {data} = await supabase.auth.getUser();
        return data;
    }

    useEffect(() => {
        getUser();
    }, [])

    const fetchCartData = async () => {
        const {data: {user}, error: user_error} = await supabase.auth.getUser();
        if(user === null || user_error) return
        
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
                    color:colors(color), 
                    size:sizes(size_in_kg),
                    price_in_cents,
                    discount_price,
                    in_stock
                ),
                quantity
            )
        `).eq('user_id', `${user?.id}`).order(`id`, {referencedTable: 'shopping_cart_items', ascending: true}).limit(1).single()
    
        if(error) {
            console.log(error.message)
            // throw new Error(error)
        }
        
        setShoppingCart(data || {items: []})
    }

    const updateTotalCost = async () => {
        let new_subtotal = 0;

        shoppingCart?.items?.forEach((item: any) => {
            let itemTotal = 0;
            
            item.variation?.discount_price == null
            ? itemTotal = item.quantity * item.variation.price_in_cents
            : itemTotal = item.quantity * item.variation.discount_price
    
            new_subtotal = new_subtotal + itemTotal
        })

        setShoppingCart((prev: any) => ({...prev, subtotal: new_subtotal}))

        const { error } = await supabase.from('shopping_cart')
            .update({subtotal: new_subtotal})
            .eq('id', shoppingCart.id)

        if(error) console.log(`${error.message}`);
    }   

    useEffect(() => {
        updateTotalCost();
    }, [shoppingCart?.items])

    //Fetch Cart Items
    useEffect(()=> {
        fetchCartData();
    }, [])

useEffect(() => {
    if(!shoppingCart.id) return 

    const channel = supabase.channel('realtime-cart').on('postgres_changes', {
        event: '*', schema: 'public', table: 'shopping_cart_items', filter: `cart_id=eq.${shoppingCart.id}`
    }, (payload) => {  
        console.log(payload.eventType) 
        fetchCartData();
        // switch(payload.eventType) {
        //     case 'INSERT':
        //         fetchCartData()
        //         break;
        //     case 'UPDATE':
        //         fetchCartData()
        //         break;
        //     case 'DELETE':
        //         fetchCartData()
        //         break;
        //     default: break;
        // }
       
    }).subscribe()

    return () => {supabase.removeChannel(channel);}
}, [shoppingCart.id])
 
    const addCartItem = async (cartItem: any) => {
        const user = await getUserOrSignInAnon();

        if(user?.is_anonymous) {
            const {data, error} = await supabase.from('shopping_cart')
                .select(`*`).eq('user_id', user?.id);
            if(error) {
                const {data, error} = await supabase.from('shopping_cart').insert({})
                await fetchCartData();
            }
        }

        const {data, error}: any = await supabase.from('shopping_cart_items').select(`
            cart_id,
            variation_id, 
            quantity
        `).eq('cart_id', `${shoppingCart.id}`)
        .eq('variation_id', `${cartItem.variation_id}`)
        .limit(1)
        .single();
        
        if (error) {
            await supabase.from('shopping_cart_items').insert({
                cart_id: shoppingCart.id,
                variation_id: cartItem.variation_id,
                product_id: cartItem.product_id,
                quantity: cartItem.quantity,
            }).select()
        } else {
            await supabase.from('shopping_cart_items').update({
                quantity: data.quantity + cartItem.quantity,
            }).eq('cart_id', shoppingCart.id).eq('variation_id', cartItem.variation_id)
        }
    }

    const removeCartItem = async (cartItemId: string) => {
        const res = await supabase.from('shopping_cart_items').delete().eq('id', cartItemId);

        if (res.error != null) console.log(res.error.message)

        const cartItems = shoppingCart.items.filter((item: any) => {
            return item.id !== cartItemId
        })

        setShoppingCart((prev: any) => ({...prev, items: [...cartItems]}))
    }

    const addQuantity = async (cartItemId: string, item_quantity: number, item_unit_price: number, item_discount_price?: number) => {
        const price = item_discount_price ? item_discount_price : item_unit_price;

        const { error } = await supabase.from('shopping_cart_items')
        .update({quantity: item_quantity + 1})
        .eq('id', cartItemId)

        if(error) console.log(error?.message)
        // await fetchCartData();

    }

    const subtractQuantity = async (cartItemId: string, item_quantity: number, item_unit_price: number, item_discount_price?: number) => {
        const price = item_discount_price ? item_discount_price : item_unit_price;

        if(item_quantity === 1) console.log('You cannot have 0 quantity. Please remove this item from your cart if you are no longer interested.')

        const { error } = await supabase.from('shopping_cart_items')
            .update({quantity: item_quantity - 1})
            .eq('id', cartItemId)

        if(error) console.log(error?.message)

        // await fetchCartData();
    }

    return (
        <CartContext.Provider value={{shoppingCart, addCartItem, removeCartItem, addQuantity, subtractQuantity}}>
            { children }
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext);

export default ShoppingCart;