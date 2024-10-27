import styles from '../styles.module.css';


const Terms = () => {
    return (
        <div className={`${styles.legal_page}`}>
            <h1 className={`${styles.legal_header}`}>Terms & Conditions</h1>

            <section className={`${styles.legal_section}`}>
                <p className={`${styles.legal_paragraph}`}>
                    Please read these Terms of Use carefully before using the website operated by us
                </p>

                <p className={`${styles.legal_paragraph}`}>
                    Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
                </p>

                <p className={`${styles.legal_paragraph}`}>
                    By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                </p>
            </section>

            <section className={`${styles.legal_section}`}>
                <h2 className={`${styles.legal_subheader}`}>Intellectual Property</h2>
                <p className={`${styles.legal_paragraph}`}>The Service and its original content, features and functionality are and will remain the exclusive property of Maungal's Pet Supplies and its licensors.</p>
            </section>
            
            <section className={`${styles.legal_section}`}>
                <h2 className={`${styles.legal_subheader}`}>Links To Other Websites</h2>
                <p className={`${styles.legal_paragraph}`}>Our Service may contain links to third-party web sites or services that are not owned or controlled by Mungal's Pet Supplies.</p>

                <p className={`${styles.legal_paragraph}`}>
                    Mungal's Pet Supplies has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third 
                    party web sites or services. You further acknowledge and agree that Mungal's Pet Supplies shall not be responsible or liable, directly or indirectly, for any damage 
                    or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
                </p>

                <p className={`${styles.legal_paragraph}`}>
                We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
                </p>
            </section>

            <section className={`${styles.legal_section}`}>
                <h2 className={`${styles.legal_subheader}`}>Termination</h2>
                <p className={`${styles.legal_paragraph}`}>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                <p className={`${styles.legal_paragraph}`}>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
            </section>

            <section className={`${styles.legal_section}`}>
                <h2 className={`${styles.legal_subheader}`}>Disclaimer</h2>
                <p className={`${styles.legal_paragraph}`}> These Terms shall be governed and construed in accordance with the laws of Trinidad and Tobago without regard to its conflict of law provisions.</p>
                <p className={`${styles.legal_paragraph}`}>
                    Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
                    If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms 
                    will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace 
                    any prior agreements we might have between us regarding the Service.
                </p>
            </section>

            <section className={`${styles.legal_section}`}>
                <h2 className={`${styles.legal_subheader}`}>Changes</h2>
                    <p className={`${styles.legal_paragraph}`}> 
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                    </p>

                    <p className={`${styles.legal_paragraph}`}>      
                        By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                    </p>
            </section>

            <section className={`${styles.legal_section}`}>
                <h2 className={`${styles.legal_subheader}`}>Contact Us</h2>
                    <p className={`${styles.legal_paragraph}`}> 
                        If you have any questions about these Terms, please contact us.
                    </p>
            </section>
        </div>
    )
}

export default Terms;