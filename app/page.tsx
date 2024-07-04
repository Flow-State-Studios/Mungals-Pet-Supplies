import styles from './styles.module.css';
import HeroSection from "@/components/hero/hero-section";
import { createClient } from "@/utils/supabase/server";
import Image from 'next/image';
import Link from 'next/link';

export const header = <>
  Pet Life, <br/> 
  But <span className={`font-accent font-italic`}>Elevated.</span> 
</>

export default async function Index() {
 
  return (
    <div className={``}>
        <HeroSection img={`/dog-green`} header={header}>
          <div className={`${styles.paws}`}>
            <Image src={`/paws.svg`} width={284.41} height={684.19} alt={'Paw prints across the page'}/>
          </div>
            <h1 className={`${styles.hero_header}`}>{ header }</h1>

            <p className={`${styles.sub_header}`}>
                Mungral’s is where luxury meets love. 
                elevate your pet’s lifestyle with our selection of premium products. 
            </p>

            <Link className={`btn ${styles.shop}`} href={`/shop`}>Shop Now</Link>

            <div className={`${styles.benefits}`}>
              <p className={`p-xsmall ${styles.benefit}`}>Same-Day Delivery</p>
              <p className={`p-xsmall ${styles.benefit}`}>Affordable Luxury</p>
            </div>

        </HeroSection>

        <Link className={`btn ${styles.shop_fixed}`} href={`/shop`}>Shop Now</Link>
    </div>
  )
}
