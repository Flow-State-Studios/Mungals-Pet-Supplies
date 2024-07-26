'use client';
import Link from 'next/link';
import styles from '../styles.module.css';
import { useState } from 'react';
import Image from 'next/image';

const CategoryItem = ({category, closeMenu}: {category: string, closeMenu: any}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <li className={`${styles.category_item}`}>
            <div className={`${styles.toggle_category}`} onClick={(e) => {setIsOpen(prev => !prev)}}>
                {category == 'fish' ? `${category}` : `${category}s`}
                <div className={`${styles.carot}`}>
                    <Image src={'/carot.svg'} fill={true} alt={`toggle sub-menu`}/>
                </div>
            </div>
            
            { 
                isOpen 
                ? <ul className={`${styles.sub_categories}`}>
                    <li onClick={() => {closeMenu(false)}}><Link href={`/shop?animal=${category == 'fish' ? `${category}` : `${category}s#browse`}`}>{category} Store</Link></li>
                    <li onClick={() => {closeMenu(false)}}><Link href={`/shop?animal=${category}s&subcategory=food#browse`}>{category} Food</Link></li>
                    <li onClick={() => {closeMenu(false)}}><Link href={`/shop?animal=${category}s&subcategory=toys#browse`}>{category} Toys</Link></li>
                    {
                        category != 'fish' 
                        ? <li onClick={() => {closeMenu(false)}}><Link href={`/shop?animal=${category}s&subcategory=comfort`}>{category} Comfort</Link></li>
                        : null
                    }
                    
                </ul>
                : null
            }
        </li>
    )
}


export default CategoryItem;