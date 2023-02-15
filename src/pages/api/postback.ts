import db from "../../utils/db";
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
        let { oid } = req.query;
        console.log(req.query);
        await Registration.updateOne({ oid }, { hasPaid: true });
        console.log(oid);
        return res.status(200).json({ message: "Transaction Successful" });
      } catch (err: any) {
        console.error(err.message);
        return res.status(500).json({ message: err.message });
      }
  }
}
