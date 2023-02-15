import orderid from "models/orderid";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      try {
        let val = await orderid.create({ value: req.query.value });
        console.log(val);
        return res.status(201);
      } catch (err: any) {
        console.error(err.message);
        return res.status(500);
      }
    }
    case "DELETE": {
      try {
        let val = await orderid.deleteMany();
        console.log(val);
        return res.status(200);
      } catch (err: any) {
        console.error(err.message);
        return res.status(500);
      }
    }
  }
}
