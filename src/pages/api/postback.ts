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
        await Registration.updateOne({ oid }, { hasPaid: true });
        return res.status(200).json({ message: "Transaction Successful" });
      } catch (err: any) {
        console.error(err.message);
        return res.status(502).json({ message: err.message });
      }
    default:
      return res.status(405).json("No target API method");
  }
}
