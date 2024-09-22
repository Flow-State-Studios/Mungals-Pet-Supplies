'use client';
import Image from 'next/image';
import styles from '../styles.module.css';
import CategoryItem from './category-item';
import { useState } from 'react';
import Link from 'next/link';

const ShopByCategories = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className={`${styles.menu_toggle}`}>
                <button className={``} onClick={() => setIsOpen((prev: boolean) => !prev)}>
                    Explore Categories
                </button>
        
            </div>

            <div className={`${styles.store_categories} ${isOpen ? `${styles.store_categories_open}` : ``}`}>
                <header className={`${styles.categories_header}`}>
                    <button className={`btn_icon`}>
                        <div>
                            <Image src={'/close.svg'} fill={true} alt='Close'/>
                        </div>
                    </button>
                    <h4 className={`${styles.header}`}>Explore Categories</h4>
                </header>

                <ul className={`${styles.store_categories_list}`}>

                    <li className={`${styles.category_item}`}>
                        <Link href={`/shop`} onClick={() => {setIsOpen(false)}}>Explore All</Link>
                    </li>
                    <CategoryItem category={`dog`} closeMenu={setIsOpen}/>
                    <CategoryItem category={`cat`} closeMenu={setIsOpen}/>
                    <CategoryItem category={`bird`} closeMenu={setIsOpen}/>
                    <CategoryItem category={`fish`} closeMenu={setIsOpen}/>
                </ul>

                <button className={`${styles.menu_close} btn-outlined`} onClick={() => setIsOpen((prev: boolean) => !prev)}>
                    Close Menu
                </button>
            </div>
        </>
    )
}


export default ShopByCategories;