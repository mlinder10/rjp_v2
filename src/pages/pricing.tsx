import Link from "next/link";
import React from "react";
import styles from "../styles/pricing.module.css";
import p from "public/prices.json";

export default function Pricing() {
  return (
    <>
      <header className={styles.header}>
        <nav>
          <Link href={"/"}>RJP</Link>
        </nav>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.head}>
            <p className={styles["upper-title"]}>Upper</p>
          </div>
          <div className={styles.body}>
            <table className={styles.table}>
              <th>
                <td></td>
                <td>Week Days</td>
                <td>Weekends</td>
              </th>
              <tr>
                <td className={styles.residency}>Residents</td>
                <td className={styles.price}>{p.Upper.resident.weekday}</td>
                <td className={styles.price}>{p.Upper.resident.weekend}</td>
              </tr>
              <tr>
                <td className={styles.residency}>Non Residents</td>
                <td className={styles.price}>{p.Upper.nonresident.weekday}</td>
                <td className={styles.price}>{p.Upper.nonresident.weekend}</td>
              </tr>
              <tr>
                <td className={styles.residency}>Non Profits</td>
                <td className={styles.price}>{p.Upper.nonprofit.weekday}</td>
                <td className={styles.price}>{p.Upper.nonprofit.weekend}</td>
              </tr>
            </table>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.head}>
            <p>Lower</p>
          </div>
          <div className={styles.body}>
            <table className={styles.table}>
              <th>
                <td></td>
                <td>Week Days</td>
                <td>Weekends</td>
              </th>
              <tr>
                <td className={styles.residency}>Residents</td>
                <td className={styles.price}>{p.Lower.resident.weekday}</td>
                <td className={styles.price}>{p.Lower.resident.weekend}</td>
              </tr>
              <tr>
                <td className={styles.residency}>Non Residents</td>
                <td className={styles.price}>{p.Lower.nonresident.weekday}</td>
                <td className={styles.price}>{p.Lower.nonresident.weekend}</td>
              </tr>
              <tr>
                <td className={styles.residency}>Non Profits</td>
                <td className={styles.price}>{p.Lower.nonprofit.weekday}</td>
                <td className={styles.price}>{p.Lower.nonprofit.weekend}</td>
              </tr>
            </table>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.head}>
            <p>Hamlet</p>
          </div>
          <div className={styles.body}>
            <table className={styles.table}>
              <th>
                <td></td>
                <td>Week Days</td>
                <td>Weekends</td>
              </th>
              <tr>
                <td className={styles.residency}>Residents</td>
                <td className={styles.price}>{p.Hamlet.resident.weekday}</td>
                <td className={styles.price}>{p.Hamlet.resident.weekend}</td>
              </tr>
              <tr>
                <td className={styles.residency}>Non Residents</td>
                <td className={styles.price}>{p.Hamlet.nonresident.weekday}</td>
                <td className={styles.price}>{p.Hamlet.nonresident.weekend}</td>
              </tr>
              <tr>
                <td className={styles.residency}>Non Profits</td>
                <td className={styles.price}>{p.Hamlet.nonprofit.weekday}</td>
                <td className={styles.price}>{p.Hamlet.nonprofit.weekend}</td>
              </tr>
            </table>
          </div>
        </section>
        
      </main>
    </>
  );
}
