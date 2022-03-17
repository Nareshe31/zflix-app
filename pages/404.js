import Head from 'next/head';
import styles from '../scss/components/error.module.scss';

function ErrorPage() {
    
    return(
        <>
            <Head>
                <title>404: This page could not be found</title>
            </Head>
            <div className={styles.error_container}>
                <div className={styles.error_content}>
                    <h1>404</h1>
                    <div className={styles.error_message}>
                        This page could not be found.
                    </div>
                </div>
            </div>
        </>
    )
}

export default ErrorPage;