import Image from 'next/image';
import styles from './styles.module.css';
import Link from 'next/link';


const Categories = () => {
    return (
        <div className={`${styles.categories}`}>

            <Link href={`/shop?categories=dog+food`} className={`${styles.category}`}>
                <div className={`${styles.category_img}`}>
                    <Image src={'/dog-food.jpeg'} fill={true} sizes='(max-width: 800px) 200px, 100%' alt='Dog food.'/>
                </div>
                <p className='p-small'>Dog Food</p>
            </Link>

            <Link href={`/shop?categories=dog+toys`} className={`${styles.category}`}>
                <div className={`${styles.category_img}`}>
                    <Image src={'/dog-toys.jpeg'} fill={true} sizes='(max-width: 800px) 200px, 100%' alt='Dog toys.'/>
                </div>
                <p className='p-small'>Dog Toys</p>
            </Link>

            <Link href={`/shop?categories=cat+food`} className={`${styles.category}`}>
                <div className={`${styles.category_img}`}>
                    <Image src={'/cat-green.jpg'} fill={true} sizes='(max-width: 800px) 200px, 100%' alt='Cat food.'/>
                </div>
                <p className='p-small'>Cat Food</p>
            </Link>

            <Link href={`/shop?categories=cat+toys`}className={`${styles.category}`}>
                <div className={`${styles.category_img}`}>
                    <Image src={'/cat-pink.jpg'} fill={true} sizes='(max-width: 800px) 200px, 100%' alt='Cat food.'/>
                </div>
                <p className='p-small'>Cat Toys</p>
            </Link>

            <Link href={`/shop?categories=fish+food`} className={`${styles.category}`}>
                <div className={`${styles.category_img}`}>
                    <Image src={'/fish-blue.jpg'} fill={true} sizes='(max-width: 800px) 200px, 100%' alt='Fish food.'/>
                </div>
                <p className='p-small'>Fish Food</p>
            </Link>

            <Link href={`/shop?categories=bird+food`}  className={`${styles.category}`}>
                <div className={`${styles.category_img}`}>
                    <Image src={'/bird-green.jpg'} fill={true} sizes='(max-width: 800px) 200px, 100%' alt='Bird food.'/>
                </div>
                <p className='p-small'>Bird Food</p>
            </Link>

        </div>
    )
}

export default Categories;