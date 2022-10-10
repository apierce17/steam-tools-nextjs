import { useRef } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import styles from '../../styles/layout/navbar.module.css'

import logo from '../../public/images/logo.svg'
import React from "react";

export default function Navbar() {
    const nav =  React.useRef<HTMLDivElement>(null);
    const router = useRouter();

  return (
    <nav className={styles.navbar} ref={nav}>
        <div className={styles.linkWrapper}>
            <Link href="/">
                <a className={styles.logo}>
                    <Image
                        src={logo}
                        alt="Picture of the author"
                        width={100}
                        height={60}
                    />
                </a>
            </Link>
            <ul className={styles.links}>
                <li className={`${styles[router.pathname == "/compare" ? "active" : "inactive"]}`}>
                    <Link href="/compare">Compare</Link>
                </li>
                {/* <li className={`${styles[router.pathname == "/random" ? "active" : "inactive"]}`}>
                    <Link href="/random">Random</Link>
                </li> */}
            </ul>
        </div>
    </nav>
  );
}
