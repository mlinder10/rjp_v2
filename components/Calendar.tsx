import Link from "next/link";
import Form from "./Form";
import Filter from "./Filter";
import styles from "../src/styles/calendar.module.css";
import Month from "./Month";
import { Dispatch, SetStateAction, useState } from "react";
import { option, setOption, registration, pageProps } from "@/pages/calendar";

const MONTHS = [
  {
    name: "January",
    days: 31,
    offset: 0,
  },
  {
    name: "February",
    days: 28,
    offset: 3,
  },
  {
    name: "March",
    days: 31,
    offset: 3,
  },
  {
    name: "April",
    days: 30,
    offset: 6,
  },
  {
    name: "May",
    days: 31,
    offset: 1,
  },
  {
    name: "June",
    days: 30,
    offset: 4,
  },
  {
    name: "July",
    days: 31,
    offset: 6,
  },
  {
    name: "August",
    days: 31,
    offset: 2,
  },
  {
    name: "September",
    days: 30,
    offset: 5,
  },
  {
    name: "October",
    days: 31,
    offset: 0,
  },
];

const PAVILIONS = ["Upper", "Lower", "Hamlet"];

type optionsType = [option, setOption];

function filterMonths(registrations: registration[], monthName: string) {
  let filtered: registration[] = [];

  for (let registration of registrations) {
    if (registration.month == monthName) filtered.push(registration);
  }

  return filtered;
}

type filterType = [string[], Dispatch<SetStateAction<string[]>>];

export default function Calendar({ registrations }: pageProps) {
  const [filter, setFilter]: filterType = useState(PAVILIONS);

  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0].name);

  const [options, setOptions]: optionsType = useState({
    month: "",
    date: "",
    pavilion: "",
    time: "",
  });

  function filterByPav() {
    if (filter.length === 3) return registrations;

    let filtered: registration[] = [];

    for (let registration of registrations) {
      if (filter.includes(registration.pavilion)) filtered.push(registration);
    }

    return filtered;
  }

  function changeMonth(next: boolean) {
    if (next) {
      let index = 0;
      for (let i = 0; i < MONTHS.length; i++) {
        if (MONTHS[i].name === selectedMonth) index = i;
      }
      if (index === MONTHS.length - 1) setSelectedMonth(MONTHS[0].name);
      else setSelectedMonth(MONTHS[index + 1].name);
    } else {
      let index = 0;
      for (let i = 0; i < MONTHS.length; i++) {
        if (MONTHS[i].name === selectedMonth) index = i;
      }
      if (index === 0) setSelectedMonth(MONTHS[MONTHS.length - 1].name);
      else setSelectedMonth(MONTHS[index - 1].name);
    }
  }

  function changeOptions(date: string, pavilion: string, time: string) {
    let copy = { ...options };
    copy.date = date;
    copy.pavilion = pavilion;
    copy.time = time;
    copy.month = selectedMonth;

    setOptions(copy);
  }

  function checkWeekend() {
    let days = 0;
    for (let i = 0; i < MONTHS.length; i++) {
      if (MONTHS[i].name === options.month) break;
      days += MONTHS[i].days;
    }

    days += parseInt(options.date);

    return days % 7 === 0 || days % 7 === 1;
  }

  return (
    <>
      <header className={styles.header}>
        <Filter
          selected={filter}
          options={["Upper", "Lower", "Hamlet"]}
          setSelected={setFilter}
        />
        <Link className={styles["home-link"]} style={{ zIndex: 3 }} href="/">
          RJP
        </Link>
        <div className={styles.nav}>
          <button
            onClick={() => changeMonth(false)}
            className={`${styles.back} material-symbols-outlined`}
          >
            chevron_left
          </button>
          <p>{selectedMonth}</p>
          <button
            onClick={() => changeMonth(true)}
            className={`${styles.next} material-symbols-outlined`}
          >
            chevron_right
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.form}>
          <Form
            options={options}
            registrations={filterMonths(registrations, options.month)}
            changeOptions={changeOptions}
            weekend={checkWeekend()}
          />
        </section>
        <section className={styles.month}>
          {MONTHS.map((m) => (
            <Month
              options={options}
              selected={selectedMonth}
              key={m.name}
              name={m.name}
              days={m.days}
              offset={m.offset}
              registrations={filterMonths(filterByPav(), m.name)}
              filter={filter}
              changeOptions={changeOptions}
            />
          ))}
        </section>
      </main>
    </>
  );
}
