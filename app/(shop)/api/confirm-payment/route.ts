import { ORDER_STATES } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const origin = request.nextUrl.origin;
    const customer_address = searchParams.get("customer_address") as string;
    const customer_email = searchParams.get("customer_email");
    const customer_name = searchParams.get("customer_name");
    const customer_phone = searchParams.get("customer_phone");
    const message = searchParams.get("message");
    const order_id = searchParams.get("order_id");
    const status = searchParams.get("status") as string;
    const total = searchParams.get("total");

    try {
        const supabase = createClient();
        const {data: {user}, error} = await supabase.auth.getUser();

        const split_address = customer_address.split(',');
        //update order address
        const delivery_address = {
            address_line_1: split_address[0],
            address_line_2: split_address[1],
            city: split_address[2],
            postal_code: split_address[3]   
        }
        
        const {data: existing_address, error: exisitng_address_error}: any = await supabase.from('delivery_addresses')
        .select('id')
        .eq('user_id', user?.id)
        .eq('address_line_1', delivery_address.address_line_1)
        .limit(1).single();

        let delivery_address_id = existing_address?.id;

        if(!existing_address || exisitng_address_error ) {
            const {data: address, error: address_error} = await supabase.from('delivery_addresses').upsert(delivery_address).select().single();
            if(address_error) console.log(`Address Error: ${address_error}`)
            delivery_address_id = address.id
        }

        const new_order_status = status === 'success' ? ORDER_STATES.PAYMENT_RECIEVED : ORDER_STATES.PAYMENT_FAILED;
        const {data: order, error: order_error} = await supabase.from('orders')
        .update({status: new_order_status, delivery_address_id: delivery_address_id})
        .eq('id', order_id)
        .select().single();

        if(order_error) console.log(`Order Error: ${order_error}`)

        const {
            data: shopping_cart, 
            error: shopping_cart_error
        } = await supabase.from('shopping_cart').update({subtotal: 0}).eq('user_id', user?.id).select().single();
        if(shopping_cart_error) console.log(`Order Error: ${shopping_cart_error}`)

        const {
            data: shopping_cart_items, 
            error: shopping_cart_items_error
        } = await supabase.from('shopping_cart_items').delete().eq('cart_id', shopping_cart.id)

        if(shopping_cart_error) console.log(`Order Error: ${shopping_cart_items_error}`)
    } catch (error) {
       console.log(error) 
    }
 
    return NextResponse.redirect(`${origin}/confirmation/?status=${status}&order_id=${order_id}`);
}