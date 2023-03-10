import React, { Dispatch, SetStateAction } from "react";
import { NextPageContext } from "next";
import axios from "axios";
import Calendar from "components/Calendar";

export type pageProps = {
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
  oid: string;
  phone: string;
  details: string;
};

export default function calendar({ registrations }: pageProps) {
  return <Calendar registrations={registrations} />;
}

export async function getServerSideProps(context: NextPageContext) {
  let registrations = [];

  try {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_ROOT}/api/register`);
    
    for (let r of res.data) {
      if (!r.hasPaid) continue;
      registrations.push(r);
    }
  } catch (err: any) {
    console.error(err?.message);
  }

  return {
    props: {
      registrations
    },
  };
}
