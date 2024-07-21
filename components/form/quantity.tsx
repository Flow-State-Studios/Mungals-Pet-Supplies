'use client';
import Image from 'next/image';
import styles from './styles.module.css';
import { useState } from 'react';
import { useVariationContext } from '@/app/contexts/choosen-variation';


const Quantity = ({maxQuantity}: {maxQuantity: number}) => {

    const {quantity, setQuantity} = useVariationContext();

    const addQuantity = () => {
        if(quantity === maxQuantity) return
        setQuantity((prev: number) => prev + 1)
    }

    const subtractQuantity = () => {
        if(quantity === 1) return
        setQuantity((prev: number) => prev - 1)
    }

    return (
        <div className={`${styles.order_section}`}>
            <p className='p-small'>Quantity:</p>

            <div className={`${styles.section_options}`}>
                <button type={`button`} className={`btn_icon`} disabled={quantity === 1 ? true : false} onClick={() => subtractQuantity()}>
                    <div className={``} >
                        <Image src={`/minus.svg`} width={14} height={14} alt='Minus Icon'/>
                    </div>
                </button>

                <input 
                    type='text' name={'quantity'} 
                    maxLength={3} value={quantity} 
                    className={`${styles.quantity_amnt}`}
                    onChange={() => {}}
                />

                <button type={`button`} className={`btn_icon`} disabled={quantity === maxQuantity ? true : false}  onClick={() => addQuantity()}>
                    <div className={``} >
                        <Image src={`/plus.svg`} width={14} height={14} alt='Plus Icon'/>
                    </div>
                </button>

                {/* <div className={`${styles.icon}`} onClick={() => addQuantity()}>
                    <Image src={`/plus.svg`} width={14} height={14} alt='Plus Icon'/>
                </div> */}
            </div>
        </div>
    )
}

export default Quantity;