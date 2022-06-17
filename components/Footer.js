import styles from "../scss/components/footer.module.scss";
import Link from "next/link";

function Footer({ }) {
    return (
        <footer className={styles.footer}>
            <div className={styles.row_1}>
                <a
                    href="https://zflix-backend.herokuapp.com/api/v2/zflix/latest-version"
                    target={"_blank"}
                >
                    <button className={styles.app_container}>
                        <span className={styles.text}>
                            <span className={styles.row_1}>Download</span>
                            <span className={styles.row_2}>for Android</span>
                        </span>
                        <span className={styles.icon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-download"
                                viewBox="0 0 16 16"
                            >
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                            </svg>
                        </span>
                    </button>
                </a>
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
            </div>
            <div className={styles.copyrights_container}>
                <div className={styles.copyrights}>
                    <p>
                        &copy;{new Date().getFullYear()} . All rights reserved . Privacy
                        Policy
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
