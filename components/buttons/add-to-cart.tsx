'use client';
import { useVariationContext } from "@/app/contexts/choosen-variation";
import { useCartContext } from "@/app/contexts/shopping-cart"

const AddToCart = (product_id: any) => {
    const { addCartItem } = useCartContext();
    const { choosenVariation, quantity} = useVariationContext();
     
    const cartItem = {
        product_id: product_id.product,
        variation_id: choosenVariation.id,
        quantity: quantity,
        discount_price: choosenVariation.discount_price
    }

    return <button type='button' className='btn btn-outlined' onClick={() => addCartItem(cartItem)}>
        Add to Cart
    </button>
}

export default AddToCart;