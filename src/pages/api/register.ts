import { NextApiRequest, NextApiResponse } from "next";
import Registration from "../../../models/registration";
import db from "@/utils/db";
import fs from "fs";
console.log(db.id);

function handleOrderID() {
  let orderID = fs.readFileSync("./orders.txt", { encoding: "utf-8" });
  if (typeof orderID === "string") {
    fs.writeFileSync("./orders.txt", (parseInt(orderID) + 1).toString(), {
      encoding: "utf-8",
    });
  }
  return orderID;
}

function addID() {
  try {
    let ids = fs.readFileSync("./orderID.txt", { encoding: "utf-8" });
    let idList = ids.split("\n");
    let unique = false;
    let newID = "0";
    while (!unique) {
      unique = true;
      newID = Math.floor(Math.random() * 1000000).toString();
      for (let id of idList) {
        if (id === newID) unique = false;
      }
    }
    idList.push(newID);

    let content = idList.join("\n");
    fs.writeFileSync("./orderID.txt", content, { encoding: "utf-8" });

    return newID;
  } catch (err: any) {
    console.error(err.message);
    return "0";
  }
}

function checkID(id: string) {
  try {
    let ids = fs.readFileSync("./orderID.txt", { encoding: "utf-8" });
    let idList = ids.split("\n");
    let valid = false;
    for (let i of idList) {
      if (id === i) valid = true;
    }

    idList = idList.filter((i) => i !== id);
    let content = "";
    for (let i of idList) content += i + "\n";
    fs.writeFileSync("./orderID.txt", content, { encoding: "utf-8" });

    return valid;
  } catch (err: any) {
    console.error(err.message);
    return false;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        if (req.query.type !== undefined)
          return res.status(201).json({ message: handleOrderID() });
        let registrations = await Registration.find();
        return res.status(200).json(registrations);
      } catch (err: any) {
        console.error(err?.message);
        return res.status(500).json({ message: err?.message });
      }
    case "POST":
      try {
        if (req.body.type === "generate-id") {
          let newID = addID();
          console.log(newID);
          if (newID !== "0") return res.status(201).json({ message: newID });
          return res.status(500).json({ message: "id creation faild" });
        }

        if (!checkID(req.body.id))
          return res.status(403).json({ message: "access denied" });

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
