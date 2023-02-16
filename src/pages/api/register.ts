import db from "@/utils/db";
console.log(db.id);
import { NextApiRequest, NextApiResponse } from "next";
import Registration from "../../../models/registration";
import Order from "../../../models/orderid";

async function getID() {
  try {
    let orders = await Order.find();
    let id = orders[0].value;
    await Order.updateOne({ value: id }, { value: id + 1 });
    return id;
  } catch (err: any) {
    console.error(err.message);
    return "0";
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        if (req.query.type === "id") {
          let id = await getID();
          if (id !== "0") return res.status(200).json({ message: id });
          return res
            .status(500)
            .json({ message: "Error reading/writing orders" });
        }
        let registrations = await Registration.find();
        return res.status(200).json(registrations);
      } catch (err: any) {
        console.error(err?.message);
        return res.status(500).json({ message: err?.message });
      }
    case "POST":
      try {
        let newRegsitration = await Registration.create(req.body);
        await newRegsitration.save();
        return res
          .status(201)
          .json({ message: "Registration created and saved" });
      } catch (err: any) {
        console.error(err?.message);
        return res.status(502).json({ message: err?.message });
      }
    case "PATCH":
      break;
    case "DELETE":
      try {
        let ret = await Registration.deleteMany();
        return res.status(202).json({ message: ret });
      } catch (err: any) {
        console.error(err.message);
        return res.status(502).json({ message: err.message });
      }
    default:
      return res.status(405).json({ message: "No target API method" });
  }
}
