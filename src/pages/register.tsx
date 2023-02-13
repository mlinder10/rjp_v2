import axios from "axios";
import { NextPageContext } from "next";
import React from "react";

export default function register() {
  return <div></div>;
}

export async function getServerSideProps(context: NextPageContext) {
  try {
    let obj = {...context.query}
    obj.day = obj.date
    delete obj.date

    let res = await axios.post(
      `${process.env.NEXT_PUBLIC_ROOT}/api/register`,
      obj
    );
    console.log(res.data);
  } catch (err: any) {
    console.error(err?.message);
  }
}
