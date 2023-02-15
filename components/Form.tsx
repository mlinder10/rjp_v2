import { option, registration } from "@/pages/calendar";
import React, { useState } from "react";
import styles from "../src/styles/form.module.css";
import prices from "../public/prices.json";
import axios from "axios";

type pageProps = {
  weekend: boolean;
  options: option;
  registrations: registration[];
  changeOptions: (date: string, pavilion: string, time: string) => void;
};

export default function Form({
  weekend,
  options,
  registrations,
  changeOptions,
}: pageProps) {
  const [residency, setResidency] = useState("");

  function formatDate() {
    if (options.month === "" || options.time === "") return "Select A Date";
    return options.month + ", " + options.date;
  }

  function formatPavilion() {
    if (options.pavilion === "") return "Select A Pavilion";
    if (options.pavilion === "Upper") return "Upper Pavilion";
    if (options.pavilion === "Lower") return "Lower Pavilion";
    if (options.pavilion === "Hamlet") return "Hamlet Street";
  }

  function formatTime() {
    if (options.time === "") return "Select A Time";
    if (options.time === "both") return "8:00am - 5:00pm";
    if (options.time === "morning") return "8:00am - 12:00pm";
    if (options.time === "evening") return "1:00pm - 5:00pm";
  }

  function formatResidency() {
    if (residency === "") return "Select Residency Status";
    if (residency === "resident") return "Resident";
    if (residency === "nonresident") return "Non Resident";
    if (residency === "nonprofit") return "Non Profit";
  }

  function formatPrice() {
    if (
      options.date === "" ||
      options.month === "" ||
      options.pavilion === "" ||
      options.time === "" ||
      residency === ""
    )
      return "Please Enter All Fields";
    return "$" + getPrice();
  }

  function choosePavilion(pavilion: string) {
    changeOptions(options.date, pavilion, options.time);
  }

  function getBooked() {
    let booked = [];
    for (let r of registrations) {
      if (
        r.day === options.date &&
        (r.time === options.time ||
          r.time === "both" ||
          options.time === "both")
      )
        booked.push(r.pavilion);
    }

    return booked;
  }

  function getPrice() {
    if (
      options.pavilion !== "Upper" &&
      options.pavilion !== "Lower" &&
      options.pavilion !== "Hamlet"
    )
      return;

    if (
      options.time !== "both" &&
      options.time !== "morning" &&
      options.time !== "evening"
    )
      return;

    if (
      residency !== "resident" &&
      residency !== "nonresident" &&
      residency !== "nonprofit"
    )
      return;

    if (weekend) {
      return prices[options.pavilion][residency]["weekend"].toFixed(2);
    }
    return prices[options.pavilion][residency]["weekday"].toFixed(2);
  }

  async function reserve() {
    if (getPrice() === undefined) return;

    let oid = "0";
    try {
      let orderNum = await axios.get(
        `${process.env.NEXT_PUBLIC_ROOT}/api/register?type=id`
      );
      oid = orderNum.data.message;
    } catch (err: any) {
      console.error(err.message);
      return;
    }

    try {
      let id = await axios.post(
        `${process.env.NEXT_PUBLIC_ROOT}/api/register`,
        {
          pavilion: options.pavilion,
          time: options.time,
          residency: residency,
          price: getPrice(),
          month: options.month,
          day: options.date,
          oid,
        }
      );
    } catch (err: any) {
      console.error(err.message);
      return;
    }

    window.open(
      encodeURI(
        `https://online.go2gov.net/paybyhid/pay?pid=${
          process.env.NEXT_PUBLIC_PID
        }&cid=${process.env.NEXT_PUBLIC_CID}&clientsubid=${
          process.env.NEXT_PUBLIC_CLIENTSUBID
        }&type=${
          process.env.NEXT_PUBLIC_TYPE
        }&payfor=${"Pavilion"}&oid=${oid}&amt=${getPrice()}&account=${
          process.env.NEXT_PUBLIC_ACCOUNT
        }&surl=${window.location.origin}&rurl=${window.location.origin}`
      )
    );
  }

  return (
    <section className={styles.section}>
      <p>Price: {formatPrice()}</p>
      <br />
      <p>Date: {formatDate()}</p>
      <p>Pavilion: {formatPavilion()}</p>
      <p>Time: {formatTime()}</p>
      <p>Residency: {formatResidency()}</p>
      <div className={styles["pavilion-input"]}>
        <div onClick={() => choosePavilion("Upper")}>
          <label htmlFor="Upper">Upper Pavilion</label>
          {(getBooked().includes("Upper") && (
            <input
              type="radio"
              name="pavilion"
              id="Upper"
              value="Upper"
              disabled
            />
          )) ||
            (options.pavilion === "Upper" && (
              <input
                type="radio"
                name="pavilion"
                id="Upper"
                value="Upper"
                checked
              />
            )) || (
              <input type="radio" name="pavilion" id="Upper" value="Upper" />
            )}
        </div>
        <div onClick={() => choosePavilion("Lower")}>
          <label htmlFor="Lower">Lower Pavilion</label>
          {(getBooked().includes("Lower") && (
            <input
              type="radio"
              name="pavilion"
              id="Lower"
              value="Lower"
              disabled
            />
          )) ||
            (options.pavilion === "Lower" && (
              <input
                type="radio"
                name="pavilion"
                id="Lower"
                value="Lower"
                checked
              />
            )) || (
              <input type="radio" name="pavilion" id="Lower" value="Lower" />
            )}
        </div>
        <div onClick={() => choosePavilion("Hamlet")}>
          <label htmlFor="Hamlet">Hamlet Pavilion</label>
          {(getBooked().includes("Hamlet") && (
            <input
              type="radio"
              name="pavilion"
              id="Hamlet"
              value="Hamlet"
              disabled
            />
          )) ||
            (options.pavilion === "Hamlet" && (
              <input
                type="radio"
                name="pavilion"
                id="Hamlet"
                value="Hamlet"
                checked
              />
            )) || (
              <input type="radio" name="pavilion" id="Hamlet" value="Hamlet" />
            )}
        </div>
     
      </div>
      <div className={styles["residency-input"]}>
        <div onClick={() => setResidency("resident")}>
          <label htmlFor="resident">Resident</label>
          <input type="radio" name="residency" id="resident" value="resident" />
        </div>
        <div onClick={() => setResidency("nonresident")}>
          <label htmlFor="nonresident">Non Resident</label>
          <input
            type="radio"
            name="residency"
            id="nonresident"
            value="nonresident"
          />
        </div>
        <div onClick={() => setResidency("nonprofit")}>
          <label htmlFor="nonprofit">Non Profit</label>
          <input
            type="radio"
            name="residency"
            id="nonprofit"
            value="nonprofit"
          />
        </div>
      </div>
      <button className={styles.reserve} onClick={reserve}>Reserve</button>
    </section>
  );
}
