'use client';
import Link from 'next/link';
import styles from './styles.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

const FeaturedColorOptions = ({
        product_id, variation_color, available_colors
    }: {product_id: string, variation_color: any, available_colors: any[]}) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const size = searchParams.get('size');

    return (
        <div className={`${styles.order_section}`}>
            <p className={`p-small`}>Colors:</p>

            <div className={`${styles.section_options}`}>
                {
                    available_colors.map((color: any, idx: number) => {
                        const {color: color_name, id} = color.colors;
                        const checked = variation_color?.id === id ? true : false;
                        if(available_colors.length === 1 && checked === false) {router.push(`/?size=${size}&color=${color_name}#featured`)}
                        return <Link href={`/?size=${size}&color=${color_name}#featured`} key={color.id}>
                            <label className={`radio_label`} tabIndex={0}>
                                    {color_name}
                                    <input 
                                        type={`radio`} name='color'
                                        value={color.id} checked={checked} readOnly={true}
                                        key={`${product_id}-${id}`} 
                                    />
                            </label>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}

export default FeaturedColorOptions;