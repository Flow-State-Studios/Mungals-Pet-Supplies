import { ReactNode } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import Logo from '../logo';

interface Hero {
    img: string,
    header: string | ReactNode,
    children: any,
}

const HeroSection = ({ img, header, children}: Hero) => {
    return <div className={`background_container ${styles.heroWrapper}`}>
        <div className={`border_lg ${styles.hero_img}`}>
            <Image 
                src={`${img}.jpg`} alt='A happy pet' fill={true} 
                priority={true} placeholder={'blur'} blurDataURL={`${img}-blur.jpg`}/>
            
            <div className={`${styles.header_container__mobile}`}>
                <div className={`${styles.logo}`}>
                    <Logo styling={`white left`} />
                </div>
         
                <h1 className={`${styles.hero_header}`}>{ header }</h1>
            </div>
        </div>

        <div className={`${styles.hero_content}`}>
            { children }
        </div>
    </div>
}

export default HeroSection;