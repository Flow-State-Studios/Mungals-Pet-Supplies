'use client';
import { useSearchParams } from 'next/navigation';
import styles from './styles.module.css';
import Link from 'next/link';

const FeaturedSizeOptions = ({product_id, variation_size, available_sizes}: {product_id: string, variation_size: any, available_sizes: any[]}) => {

    const searchParams = useSearchParams();
    const color = searchParams.get('color');

    return (
        <div className={`${styles.order_section}`}>
            <p className={`p-small`}>Sizes:</p>

            <div className={`${styles.section_options}`}>
                {
                    available_sizes.map((size: any, idx: number) => {
                        const checked = variation_size.id === size.id ? true : false;
                        return  <Link href={`/?size=${size.size_in_kg}&color=${color}#featured`} key={size.id}>
                            <label className={`radio_label`} tabIndex={0}>
                                {size.size_in_kg} kgs
                                <input 
                                    type={`radio`} name='size' 
                                    value={size.id} checked={checked} readOnly={true}
                                    key={`${variation_size}-${size.id}`} 
                                />
                            
                            </label>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}

export default FeaturedSizeOptions;