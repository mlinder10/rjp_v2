import { option, registration } from "@/pages/calendar";
import React from "react";
import styles from "../src/styles/day.module.css";

type dayProps = {
  date: number;
  options: option;
  registrations: registration[];
  filter: string[];
  changeOptions: (date: string, pavilion: string, time: string) => void;
};

export default function Day({
  options,
  date,
  registrations,
  filter,
  changeOptions,
}: dayProps) {
  function checkAvailability(time: string) {
    let count = 0;
    for (let regsitration of registrations) {
      if (regsitration.time === time || regsitration.time === "both") count++;
    }
    return count < filter.length;
  }

  function handleSelect(time: string) {
    let pavilion = options.pavilion;
    if (filter.length === 1) pavilion = filter[0];
    for (let r of registrations) {
      if (r.pavilion === options.pavilion) pavilion = ""
    }
    changeOptions(date.toString(), pavilion, time);
  }

  if (date === 0) return <span></span>;

  return (
    <div>
      <div className={styles["link-wrapper"]}>
        <div className={styles.left}>
          <button onClick={() => handleSelect("both")}>
            <div
              className={`${styles.both} ${
                checkAvailability("morning") && checkAvailability("evening")
                  ? styles.green
                  : styles.red
              }`}
            ></div>
          </button>
        </div>
        <div className={styles.right}>
          <button onClick={() => handleSelect("morning")}>
            <div
              className={`${styles.morning} ${
                checkAvailability("morning") ? styles.green : styles.red
              }`}
            ></div>
          </button>
          <button onClick={() => handleSelect("evening")}>
            <div
              className={`${styles.evening} ${
                checkAvailability("evening") ? styles.green : styles.red
              }`}
            ></div>
          </button>
        </div>
        <p className={styles.date}>{date}</p>
      </div>
    </div>
  );
}
