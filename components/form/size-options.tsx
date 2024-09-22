'use client';
import { useContext } from 'react';
import styles from './styles.module.css';
import { variationContext } from '@/app/contexts/choosen-variation';

const SizeOptions = ({product_id, sizes}: {product_id: string, sizes: any[]}) => {

    const {choosenVariation: variation, setSize} = useContext(variationContext);

    return (
        <div className={`${styles.order_section}`}>
            <p className={`p-small`}>Sizes:</p>

            <div className={`${styles.section_options}`}>
                {
                    sizes.map((item: any, idx: number) => {
                        return <label className={`radio_label`} tabIndex={0} key={item.id}>
                            {item.size_in_kg} kgs
                            <input 
                                type={`radio`} name='size' onClick={() => setSize(item.id)}
                                value={item.id} defaultChecked={variation.size_id === item.id ? true : false}
                                key={`${product_id}-${item.id}`} 
                            />
                        </label>
                    })
                }
            </div>
        </div>
    )
}

export default SizeOptions;