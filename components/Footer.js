import styles from '../scss/components/footer.module.scss'
import Link from "next/link";

function Footer({}) {
    
    return(
        <footer className={styles.footer}>
            
            <div className={styles.contact_us}>
                <div className={styles.contact_us_list}>
                    <Link href="mailto:zflix.contact@protonmail.com">
                        <div className={styles.c_container}>
                            <i className="bi bi-envelope"></i>
                        </div>
                    </Link>
                    <div className={styles.c_container}>
                        <i className="bi bi-twitter"></i>
                    </div>
                    <div className={styles.c_container}>
                        <i className="bi bi-facebook"></i>
                    </div>
                    <div className={styles.c_container}>
                        <i className="bi bi-instagram"></i>
                    </div>
                </div>
            </div> 
            <div className={styles.copyrights_container}>
                <div className={styles.copyrights}>
                    <p>&copy;{(new Date()).getFullYear()} . All rights reserved . Privacy Policy</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;