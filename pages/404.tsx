import styles from '../styles/pages/404.module.css'

export default function Custom404() {
    return (
        <div className={styles.errorContainer}>
            <h1 className={styles.error}>OOPS</h1>
            <h2 className={styles.error}>Page Not Found</h2>
        </div>
    )
}