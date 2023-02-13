import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        let query = req.query;
        console.log(query);
        return res.status(200).json({ message: "Transaction Successful" });
      } catch (err: any) {
        console.error(err.message);
        return res.status(500).json({ message: err.message });
      }
  }
}
