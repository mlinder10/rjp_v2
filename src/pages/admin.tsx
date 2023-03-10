import axios from "axios";
import { NextPageContext } from "next";
import React, { useState } from "react";
import { registration } from "./calendar";
import styles from "../styles/admin.module.css";

type pageProps = {
  registrations: registration[];
};

export default function Admin({ registrations }: pageProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const usernameRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();

  const nameRef = React.createRef<HTMLInputElement>();
  const addressRef = React.createRef<HTMLInputElement>();
  const dayRef = React.createRef<HTMLInputElement>();
  const priceRef = React.createRef<HTMLInputElement>();
  const phoneRef = React.createRef<HTMLInputElement>();
  const detailsRef = React.createRef<HTMLTextAreaElement>();

  const [pav, setPav] = useState("Upper");
  const [time, setTime] = useState("both");
  const [residency, setResidency] = useState("resident");
  const [month, setMonth] = useState("January");

  function logIn() {
    if (
      usernameRef.current?.value === process.env.NEXT_PUBLIC_USERNAME &&
      passwordRef.current?.value === process.env.NEXT_PUBLIC_PASSWORD
    )
      setLoggedIn(true);
  }

  async function removeOne(id: string) {
    try {
      let res = await axios.delete(
        `${process.env.NEXT_PUBLIC_ROOT}/api/register?type=single&id=${id}`
      );
      console.log(res.data);
      refreshRegistrations()
    } catch (err: any) {
      console.error(err.message);
    }
  }

  async function clearUnpaid() {
    try {
      let res = await axios.delete(
        `${process.env.NEXT_PUBLIC_ROOT}/api/register?type=cleanup`
      );
      console.log(res.data);
      refreshRegistrations()
    } catch (err: any) {
      console.error(err.message);
    }
  }

  async function clearAll() {
    try {
      let res = await axios.delete(
        `${process.env.NEXT_PUBLIC_ROOT}/api/register?type=reset`
      );
      console.log(res.data);
      refreshRegistrations()
    } catch (err: any) {
      console.error(err.message);
    }
  }

  async function addRegistration() {
    try {
      let res = await axios.post(`${process.env.NEXT_PUBLIC_ROOT}/api/register`, {
        name: nameRef.current?.value,
        address: addressRef.current?.value,
        pavilion: pav,
        time: time,
        residency: residency,
        month: month,
        day: dayRef.current?.value,
        oid: "Manually Entered Registration",
        price: priceRef.current?.value,
        hasPaid: true,
        details: detailsRef.current?.value,
        phone: phoneRef.current?.value
      });
      console.log(res.data);
      refreshRegistrations()
    } catch (err: any) {
      console.error(err.message);
    }
  }

  async function refreshRegistrations() {
    try {
      let res = await axios.get(`${process.env.NEXT_PUBLIC_ROOT}/api/register`)
      registrations = res.data
    } catch (err:any) {
      console.error(err.message)
    }
  }

  const handlePav = (e: any) => {
    setPav(e.target.value);
  };

  const handleTime = (e: any) => {
    setTime(e.target.value);
  };

  const handleResidency = (e: any) => {
    setResidency(e.target.value);
  };

  const handleMonth = (e: any) => {
    setMonth(e.target.value);
  };

  if (!loggedIn) {
    return (
      <main className={styles["login-main"]}>
        <div className={styles["login-box"]}>
          <div>
            <label>Username</label>
            <input ref={usernameRef} type="text" />
          </div>
          <div>
            <label>Password</label>
            <input ref={passwordRef} type="password" />
          </div>
          <button onClick={logIn}>Log In</button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className={styles.top}>
        <section className={styles.create}>
          <label>Name</label>
          <input ref={nameRef} type="text" />
          <label>Address</label>
          <input ref={addressRef} type="text" />
          <label>Pavilion</label>
          <select onChange={handlePav} name="pavilion" id="pavilion">
            <option value="Upper">Upper Pavilion</option>
            <option value="Upper">Lower Pavilion</option>
            <option value="Upper">Hamlet St Pavilion</option>
          </select>
          <label>Time</label>
          <select onChange={handleTime} name="time" id="time">
            <option value="both">8:00am - dusk</option>
            <option value="morning">8:00am - 1:00pm</option>
            <option value="evening">2:00pm - dusk</option>
          </select>
          <label>Residency</label>
          <select onChange={handleResidency} name="residency" id="residency">
            <option value="resident">Resident</option>
            <option value="nonresident">Non Resident</option>
            <option value="nonprofit">Non Profit</option>
          </select>
          <label>Month</label>
          <select onChange={handleMonth} name="month" id="month">
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
          </select>
          <label className={styles.day}>Day</label>
          <input ref={dayRef} type="text" />
          <label>Price</label>
          <input ref={priceRef} type="number" />
          <label htmlFor="">Phone</label>
          <input ref={phoneRef} type="number" />
          <label htmlFor="">Details</label>
          <textarea ref={detailsRef} name="" id="" cols={30} rows={10}></textarea>
          <button onClick={addRegistration}>Add Registration</button>
        </section>
        <section>
          <button onClick={clearAll}>DELETE ALL</button>
          <button onClick={clearUnpaid}>Remove all unpaid registrations</button>
        </section>
      </div>
      <section>
        <div>
          {registrations.map((r) => (
            <div key={r._id} className={styles["remove-option"]}>
              <span>Paid: {`${r.hasPaid}`}</span>
              <span>
                Selected Date: {r.month}, {r.day}
              </span>
              <span>Pavilion: {r.pavilion}</span>
              <span>Time: {r.time}</span>
              <span>{r.name}</span>
              <span>{r.address}</span>
              <span>{r.phone}</span>
              <span>{r.residency}</span>
              <span>${r.price}</span>
              <span>Order ID: {r.oid}</span>
              <span>{r.details}</span>
              <button onClick={() => removeOne(r.oid)}>Remove Order</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  let registrations = [];
  try {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_ROOT}/api/register`);
    registrations = res.data;
  } catch (err: any) {
    console.error(err.message);
  }

  return {
    props: {
      registrations
    },
  };
}
