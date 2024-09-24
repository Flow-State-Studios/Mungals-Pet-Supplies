import { addCartItem } from "@/actions";

const AddToCart = () => {

    return <>
        {/* <button type='button' className='btn btn-outlined' onClick={() => addCartItem(cartItem)}>
            Add to Cart
        </button> */}
        <button type='submit' className='btn btn-outlined' formAction={addCartItem}>
            Add to Cart
        </button>
    </>
}

export default AddToCart;