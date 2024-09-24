'use client';
import { useCartContext } from "@/app/contexts/shopping-cart"

const CartId = () => {
    const {shoppingCart} = useCartContext();

    return (
        <input type="text" name="cart_id" defaultValue={shoppingCart?.id} hidden={true} readOnly={true}/>
    )
}

export default CartId;