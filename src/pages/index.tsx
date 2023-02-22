import Head from "next/head";
import styles from "@/styles/index.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";

async function open() {
  let res = await axios.get(`${process.env.NEXT_PUBLIC_ROOT}/api/register`);
  console.log(res.data.length);
}

export default function Home() {
  useEffect(() => {
    open();
  }, []);

  return (
    <>
      <Head>
        <title>Russel Joy Pavilions</title>
        <meta name="description" content="Book a pavilion online." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.corner}>
          <div className={styles["corner-accent-1"]}></div>
          <div className={styles["corner-accent-2"]}></div>
        </div>
        <header className={styles.header}>
          <h1>Russell Joy Park</h1>
        </header>
        <div className={styles["img-wrapper"]}>
          <Image src="/images/home_page.jpg" alt="" fill={true} />
        </div>
        <nav className={styles.links}>
          <Link href="/calendar">Reserve A Pavilion</Link>
          <Link href="/pricing">See Our Pricing</Link>
        </nav>
      </main>
    </>
  );
}
