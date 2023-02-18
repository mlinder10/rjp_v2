import db from "@/utils/db";
console.log(db.id);
import { NextApiRequest, NextApiResponse } from "next";
import Registration from "../../../models/registration";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        let { oid, cname, caddr } = req.query;
        if (typeof caddr === "string") caddr = decodeURIComponent(caddr);
        await Registration.updateOne(
          { oid },
          { hasPaid: true, name: cname, address: caddr }
        );
        return res.status(200).json({ message: "Transaction Successful" });
      } catch (err: any) {
        console.error(err.message);
        return res.status(502).json({ message: err.message });
      }
    default:
      return res.status(405).json("No target API method");
  }
}
