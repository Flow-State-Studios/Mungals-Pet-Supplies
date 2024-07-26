import HeroSection from "@/components/hero/hero-section";
import styles from '@/components/hero/styles.module.css';

const Contact = () => {
    return (
        <div className={``}>
            <HeroSection img={'/fish-blue'} header={'Contact Us'}>
                <h1 className={`${styles.hero_header}`}>Contact Us</h1>

                <div className={`${styles.two_column_layout}`}>
                    <div className={`${styles.column}`}>
                        <h6>Contact Information</h6>
                        <p>
                            support@mungals.com<br/>
                            +1 868-123-4567<br/>
                            WhatsApp Us!
                        </p>
                    </div>

                    <div className={`${styles.column}`}>
                        <h6>Location</h6>
                        <p>
                            Mungal’s Pet Supplies <br/>
                            Diego Martin, St. Lucien Rd. <br/>
                            Trinidad & Tobago
                        </p>
                    </div>
                </div>
            </HeroSection>
        </div>
    )
}

export default Contact;