import Link from 'next/link';
import { useRouter } from "next/router";
import styles from '../../styles/components/footer.module.css'

export default function Footer() {

    const router = useRouter();

  return (
    <footer className={styles.footer}>
        <div className={styles.footerContent}>
            <div className={styles.linkWrapper}>
                <ul className={styles.links}>
                    <li className={`${styles[router.pathname == "/compare" ? "active" : "inactive"]}`}>
                        <Link href="/compare">Compare</Link>
                    </li>
                    <li className={`${styles[router.pathname == "/random" ? "active" : "inactive"]}`}>
                        <Link href="/random">Random</Link>
                    </li>
                    <li className={`${styles[router.pathname == "/about" ? "active" : "inactive"]}`}>
                        <Link href="/about">About</Link>
                    </li>
                </ul>
            </div>
            <hr/>
            <div className={styles.subInfo}>
                <ul>
                    <li>Built by <a href="">Ashton Pierce</a></li>
                    <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                    <li>All information used in this site is property of Valve/Steam, for more information please view our about page.</li>
                </ul>
            </div>
        </div>
    </footer>
  );
}
