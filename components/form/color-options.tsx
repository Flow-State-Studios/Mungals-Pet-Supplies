'use client';
import { useContext } from 'react';
import styles from './styles.module.css';
import { variationContext } from '@/app/contexts/choosen-variation';

const ColorOptions = ({product_id, colors}: {product_id: string, colors: any[]}) => {

    const {choosenVariation: variation, setColor} = useContext(variationContext);

    return (
        <div className={`${styles.order_section}`}>
            <p className={`p-small`}>Colors:</p>

            <div className={`${styles.section_options}`}>
                {
                    colors.map((item: any, idx: number) => {
                        return <label className={`radio_label`} tabIndex={0}>
                            {item.color}
                            <input 
                                type={`radio`} name='size'
                                onClick={(setColor(item.id))}
                                value={item.id} defaultChecked={variation.color_id === item.id ? true : false}
                                key={`${product_id}-${item.id}`} />
                        </label>
                    })
                }
            </div>
        </div>
    )
}

export default ColorOptions;