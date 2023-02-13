import React, { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import Month from "components/Month";
import { NextPageContext } from "next";
import axios from "axios";
import styles from "/src/styles/calendar.module.css";
import Filter from "components/Filter";
import Form from "components/Form";

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

type pageProps = {
  registrations: registration[];
};

export type option = {
  month: string;
  date: string;
  pavilion: string;
  time: string;
};

export type setOption = Dispatch<SetStateAction<option>>;

export type registration = {
  _id: string;
  name: string;
  address: string;
  pavilion: string;
  time: string;
  residency: string;
  price: string;
  hasPaid: boolean;
  month: string;
  day: string;
};

type optionsType = [option, setOption];

function filterMonths(registrations: registration[], monthName: string) {
  let filtered: registration[] = [];

  for (let registration of registrations) {
    if (registration.month == monthName) filtered.push(registration);
  }

  return filtered;
}

type filterType = [string[], Dispatch<SetStateAction<string[]>>];

export default function calendar({ registrations }: pageProps) {
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
        <Link style={{ zIndex: 3 }} href="/">
          Home
        </Link>
        <div className={styles.nav}>
          <button onClick={() => changeMonth(false)} className={styles.back}>
            {"<"}
          </button>
          <p>{selectedMonth}</p>
          <button onClick={() => changeMonth(true)} className={styles.next}>
            {">"}
          </button>
        </div>
        <Filter
          selected={filter}
          options={["Upper", "Lower", "Hamlet"]}
          setSelected={setFilter}
        />
      </header>
      <main className={styles.main}>
        <Form
          options={options}
          registrations={filterMonths(registrations, options.month)}
          changeOptions={changeOptions}
          weekend={checkWeekend()}
        />
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
      </main>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  try {
    let res = await axios.get(`${window.location.origin}/api/register`);

    return {
      props: {
        registrations: res.data,
      },
    };
  } catch (err: any) {
    console.error(err?.message);
  }
}
