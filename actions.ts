'use server';
import { redirect } from "next/navigation";
import { createClient } from "./utils/supabase/server";
import { ORDER_STATES } from "./types";
import { headers } from "next/headers";

const is_production = process.env.NODE_ENV === 'production' ? true : false;
const environment = is_production ? `live` : `sandbox`;

export const getUserOrSignInAnon = async () => {
    const supabase = createClient();
    const {data: { user }, error} = await supabase.auth.getUser();

    if(!error) {
        return user
    } else {
        const {data: {user: anon_user}, error: anon_error} = await supabase.auth.signInAnonymously();
        if(anon_error) throw new Error(`Anon Error: ${anon_error}`);

        return anon_user;
    }
} 

export const addCartItem = async (formData: FormData) => {
    const user = await getUserOrSignInAnon();
    const supabase = createClient();

    const cart_item = {
        id: formData.get('cart_id')?.valueOf() || null,
        variation_id: formData.get('variation_id')?.valueOf(),
        product_id: formData.get('product_id')?.valueOf(),
        quantity: parseInt(`${formData.get('quantity')?.valueOf()}`),
    }

    if(!cart_item.variation_id || !cart_item.product_id) return 'No item found to add to cart';
    if(!(cart_item.quantity >= 1)) return 'You need to have at least one';

    if(!cart_item.id) {
        const {data: new_cart, error} = await supabase
            .from('shopping_cart').insert({})
            .select().limit(1).single();

        if(error) {
            console.log(`New Cart Error: ${error}`)
            return error;
        }

        cart_item.id = new_cart.id;
    }

    const {data, error}: any = await supabase.from('shopping_cart_items')
    .select(`cart_id, variation_id, quantity`)
    .eq('cart_id', `${cart_item.id}`).eq('variation_id', `${cart_item.variation_id}`)
    .limit(1).single();

    if (error) {
        await supabase.from('shopping_cart_items').insert({
            cart_id: cart_item.id,
            variation_id: cart_item.variation_id,
            product_id: cart_item.product_id,
            quantity: cart_item.quantity,
        }).select()
    } else {
        const new_quantity = parseInt(data.quantity) + cart_item.quantity;
        console.log(new_quantity)

        await supabase.from('shopping_cart_items').update({
            quantity: new_quantity,
        }).eq('cart_id', cart_item.id).eq('variation_id', cart_item.variation_id)
    }
}

export const buyNow = async (formData: FormData) => {
    let response: any;
    const supabase = createClient();
    const account_number = is_production ? `${process.env.WII_PAY_ACCOUNT_NUMBER}` : '1234567890';
    const order_id = Math.floor(Math.random() * 1000000000000000).toString();
    const origin = headers().get('origin');
    const response_url = `${origin}/api/confirm-payment`;

    const product_id = formData.get('product_id')?.valueOf();
    const variation_id: any = formData.get('variation_id')?.valueOf();
    const quantity = formData.get('quantity')?.valueOf() as number;
    const variation_unit_price = formData.get('variation_unit_price')?.valueOf() as number;

    const formatter = Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
    const order_total_in_cents = quantity * (variation_unit_price);
    const order_total = formatter.format(order_total_in_cents/100)

    try {
        //get user or sign in an anonymous user
        const user = await getUserOrSignInAnon();

        // create an order
        const {data: order, error: order_error}: any = await supabase.from('orders').insert({
            id: order_id,
            status: ORDER_STATES.PENDING_PAYMENT,
            order_total: order_total_in_cents
        }).select().single();

        if(order_error) throw new Error(`${order_error.message}`)
        
        const cart_item = {
            order_id: order.id,
            quantity: quantity,
            product_id: product_id,
            variation_id: variation_id
        }
    
        const {error: order_products_error} = await supabase.from('order_products').insert(cart_item);
    
        if(order_products_error) throw new Error(`${order_products_error.message}`)

        const parameters = new URLSearchParams();
        parameters.append('account_number', account_number);
        parameters.append('environment', environment);
        parameters.append('order_id', order_id);
        parameters.append('response_url', response_url);
        parameters.append('total', order_total);
        parameters.append('avs', '0');
        parameters.append('country_code', 'TT');
        parameters.append('currency', 'TTD');
        parameters.append('fee_structure', 'customer_pay');
        parameters.append('method', 'credit_card');
        parameters.append('origin', 'Mungals_Pet_Supplies');

        const res = await fetch(`https://tt.wipayfinancial.com/plugins/payments/request`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: parameters,
            redirect: 'follow',
        });

        response = await res.json();
    } catch (error: any) {
        console.log(error.message)
        return 'There was an error confirming your order. Please try again.'
    }

   redirect(`${response.url}`)
}

export const confirmOrder = async (prevState: any, formData: FormData) => {
    let response: any;
    const supabase = createClient();
    const account_number = is_production ? `${process.env.WII_PAY_ACCOUNT_NUMBER}` : '1234567890';
    const order_total = formData.get('order_total')?.valueOf() as number;
    const order_id = Math.floor(Math.random() * 1000000000000000).toString();
    const origin = headers().get('origin');
    const response_url = `${origin}/api/confirm-payment`;
    const items: any = formData.getAll('item');

    const formatter = Intl.NumberFormat('en-us', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    const formatted_total = formatter.format(order_total/100);

    try {
        if(items.length === 0) return `You're cart is empty`;

        //get user or sign in an anonymous user
        const user = await getUserOrSignInAnon();

        //create an order
        const {data: order, error: order_error}: any = await supabase.from('orders').insert({
            id: order_id,
            status: ORDER_STATES.PENDING_PAYMENT,
            order_total: order_total
        }).select().single();
    
        if(order_error) throw new Error(`${order_error.message}`)
        //add order products for each item in this order
        const order_products = [];

        for (const item of items) {
            const parsed_item = JSON.parse(item);

            const cart_item = {
                order_id: order.id,
                quantity: parsed_item.quantity,
                product_id: parsed_item.product_id,
                variation_id: parsed_item.variation_id,
            }

            order_products.push(cart_item)
        }

        const {error: order_products_error} = await supabase.from('order_products').insert(order_products);

        if(order_products_error) throw new Error(`${order_products_error.message}`)

        //handle payment processing data
        const parameters = new URLSearchParams();
        parameters.append('account_number', account_number);
        parameters.append('environment', environment);
        parameters.append('order_id', order_id);
        parameters.append('response_url', response_url);
        parameters.append('total', formatted_total);
        parameters.append('avs', '0');
        parameters.append('email', `${user?.email}`);
        // parameters.append('addr1', '')
        // parameters.append('addr2', '')
        // parameters.append('city', '')
        parameters.append('country_code', 'TT');
        parameters.append('currency', 'TTD');
        parameters.append('fee_structure', 'customer_pay');
        parameters.append('method', 'credit_card');
        parameters.append('origin', 'Mungals_Pet_Supplies');

        const res = await fetch(`https://tt.wipayfinancial.com/plugins/payments/request`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: parameters,
            redirect: 'follow',
        });

        response = await res.json();
    } catch (error: any) {
        console.log(error.message)
        return 'There was an error confirming your order. Please try again.'
    }

    redirect(`${response.url}`)
}

export const RetryOrder = async (formData: FormData) => {
    let response;
    const supabase = createClient();
    const account_number = is_production ? `${process.env.WII_PAY_ACCOUNT_NUMBER}` : '1234567890';
    const order_id = formData.get('order_id')?.valueOf() as string;
    const origin = headers().get('origin');
    const response_url = `${origin}/api/confirm-payment`;

    try {
        //get user or sign in an anonymous user
        const user = await getUserOrSignInAnon();
        
        if(!order_id) throw new Error('There was an error getting your order');

        const {data: order, error: order_error} = await supabase.from('orders')
            .select(`*`).eq('id', order_id)
            .limit(1).single();

        if(order_error) throw new Error(order_error.message);

        const formatter = Intl.NumberFormat('en-us', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })

        const formatted_total = formatter.format(order.order_total/100);

        const parameters = new URLSearchParams();
        parameters.append('account_number', account_number);
        parameters.append('environment', environment);
        parameters.append('order_id', order_id);
        parameters.append('response_url', response_url);
        parameters.append('total', formatted_total);
        parameters.append('avs', '0');
        parameters.append('country_code', 'TT');
        parameters.append('currency', 'TTD');
        parameters.append('fee_structure', 'customer_pay');
        parameters.append('method', 'credit_card');
        parameters.append('origin', 'Mungals_Pet_Supplies');

        const res = await fetch(`https://tt.wipayfinancial.com/plugins/payments/request`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: parameters,
            redirect: 'follow',
        });

        response = await res.json();

    } catch (error: any) {
        console.log(error.message)
        return 'There was an error confirming your order. Please try again.'
    }

    redirect(`${response.url}`)
}