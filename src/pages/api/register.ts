import { NextApiRequest, NextApiResponse } from "next";
import Registration from "../../../models/registration";
import db from "@/utils/db";
import fs from "fs";
console.log(db.id);

function getID() {
  try {
    let id = fs.readFileSync("./orders.txt", { encoding: "utf-8" });
    fs.writeFileSync("./orders.txt", (parseInt(id) + 1).toString(), {
      encoding: "utf-8",
    });

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
          let id = getID();
          if (id !== "0") return res.status(200).json({ message: getID() });
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
        return res.status(500).json({ message: err?.message });
      }
    case "PATCH":
      break;
    case "DELETE":
      break;
    default:
      return res
        .status(403)
        .json({ message: "Access to this api route is forbidden" });
  }
}
