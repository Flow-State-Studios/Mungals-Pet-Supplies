'use client';
import { useContext } from 'react';
import styles from './styles.module.css';
import { variationContext } from '@/app/contexts/choosen-variation';

const ColorOptions = ({product_id }: {product_id: string}) => {

    const {choosenVariation: variation, setColor} = useContext(variationContext);

    if(variation.available_colors.length <= 0) return null

    return (
        <div className={`${styles.order_section}`}>
            <p className={`p-small`}>Colors:</p>

            <div className={`${styles.section_options}`}>
                {
                    variation.available_colors.map((item: any, idx: number) => {
                        const {color: color_name, id: id} = item.colors;
                        const checked = variation.color_id === id ? true : false;

                        return <label className={`radio_label`} tabIndex={0}>
                            {color_name}
                            <input 
                                type={`radio`} name='color'
                                onClick={(setColor(id))}
                                value={item.id} defaultChecked={checked}
                                key={`${product_id}-${id}`} />
                        </label>
                    })
                }
            </div>
        </div>
    )
}

export default ColorOptions;