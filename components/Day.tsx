import { option, registration } from "@/pages/calendar";
import React, { useEffect, useState } from "react";
import styles from "../src/styles/day.module.css";

type dayProps = {
  date: number;
  options: option;
  registrations: registration[];
  filter: string[];
  month: string;
  changeOptions: (date: string, pavilion: string, time: string) => void;
};

export default function Day({
  options,
  date,
  registrations,
  month,
  filter,
  changeOptions,
}: dayProps) {
  const [selected, setSelected] = useState("none");

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
      if (r.pavilion === pavilion && (r.time === options.time || options.time === "both" || r.time === "both")) pavilion = "";
    }
    changeOptions(date.toString(), pavilion, time);
  }

  useEffect(() => {
    if (options.date === date.toString() && options.month === month) {
      if (options.time === "both") setSelected("both");
      if (options.time === "morning") setSelected("morning");
      if (options.time === "evening") setSelected("evening");
    }
  }, [options, month, date]);

  if (date === 0) return <span></span>;

  return (
      <div className={styles["link-wrapper"]}>
        <div className={styles.left}>
          <button onClick={() => handleSelect("both")}>
            <div
              className={`${styles.both} ${
                checkAvailability("morning") && checkAvailability("evening")
                  ? styles.green
                  : styles.red
              } ${selected === "both" ? styles.selected : ""}`}
            ></div>
          </button>
        </div>
        <div className={styles.right}>
          <button onClick={() => handleSelect("morning")}>
            <div
              className={`${styles.morning} ${
                checkAvailability("morning") ? styles.green : styles.red
              } ${selected === "morning" ? styles.selected : ""}`}
            ></div>
          </button>
          <button onClick={() => handleSelect("evening")}>
            <div
              className={`${styles.evening} ${
                checkAvailability("evening") ? styles.green : styles.red
              } ${selected === "evening" ? styles.selected : ""}`}
            ></div>
          </button>
        </div>
        <p className={styles.date}>{date}</p>
      </div>
  );
}
