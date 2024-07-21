import HeroSection from "@/components/hero/hero-section"
import styles from '../../components/hero/styles.module.css';

const About = () => {
    return  (
        <div className={``}>
            <HeroSection img={`/bird-green`} header={'About Us'}>
                <h1 className={`${styles.hero_header}`}>About Us</h1>

                <div className={`${styles.two_column_layout}`}>
                    <div className={`${styles.column} ${styles.col_1}`}>
                        <h6>Mission</h6>
                        <p className={``}>We strive to give pets in Trinidad & Tobago a premium lifestyle with quality products.</p>
                    </div>

                    <div className={`${styles.column} ${styles.col_2}`}>
                        <h6>Origin</h6>
                        <p className={``}>From humble beginnings and a dream.</p>
                    </div>
                </div>
            </HeroSection>
        </div>
    )
}

export default About;