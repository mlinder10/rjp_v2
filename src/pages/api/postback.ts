import db from "@/utils/db";
console.log(db.id);
import { NextApiRequest, NextApiResponse } from "next";
import Registration from "../../../models/registration";
import nodemailer from "nodemailer";

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

        let reg = await Registration.findOne({ oid });

        let messageBody = `Client Name: ${reg.name}\nClient Address: ${reg.address}\nPhone Number: ${reg.phone}\nPavilion: ${reg.pavilion}\nResidency Status: ${reg.residency}\nDate: ${reg.month}, ${reg.day}\nPrice: ${reg.price}\nTime: ${reg.time}\nAdditional Details: ${reg.details}`;

        var transporter = nodemailer.createTransport({
          service: process.env.PROVIDER,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
          },
        });

        var mailOptions = {
          from: process.env.EMAIL,
          to: process.env.SEND_EMAIL,
          subject: "Reservation",
          text: messageBody,
        };

        transporter.sendMail(mailOptions, (err: any, info: any) => {
          if (err) {
            return res.status(200).json({ message: err.message });
          }
        });

        return res.status(200).json({ message: "Transaction Successful" });
      } catch (err: any) {
        console.error(err.message);
        return res.status(502).json({ message: err.message });
      }
    default:
      return res.status(405).json("No target API method");
  }
}
