import React from "react";
import { option, registration } from "@/pages/calendar";
import Day from "./Day";
import styles from "/src/styles/month.module.css";

type monthProps = {
  name: string;
  options: option;
  days: number;
  offset: number;
  registrations: registration[];
  filter: string[];
  selected: string;
  changeOptions: (date: string, pavilion: string, time: string) => void;
};

export default function Month({
  options,
  selected,
  name,
  days,
  offset,
  registrations,
  filter,
  changeOptions,
}: monthProps) {
  function filterDays(registrations: registration[], day: number) {
    let filtered = [];

    for (let registration of registrations) {
      if (day == 0) continue;

      if (parseInt(registration.day) === day) filtered.push(registration);
    }

    return filtered;
  }

  function createDays() {
    let dayArray: number[] = [];

    for (let i = 0; i < offset; i++) dayArray.push(0);

    for (let i = 0; i < days; i++) dayArray.push(i + 1);

    return dayArray;
  }

  if (selected !== name) return <></>;

  return (
    <section className={styles.section}>
      <div className={styles.month}>
        <span>SUN</span>
        <span>MON</span>
        <span>TUE</span>
        <span>WED</span>
        <span>THU</span>
        <span>FRI</span>
        <span>SAT</span>
        {createDays().map((d) => (
          <Day
            month={name}
            options={options}
            changeOptions={changeOptions}
            filter={filter}
            key={Math.random()}
            date={d}
            registrations={filterDays(registrations, d)}
          />
        ))}
      </div>
    </section>
  );
}
