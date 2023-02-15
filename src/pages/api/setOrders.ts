import orderid from "models/orderid";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      try {
        let id = req.query.value;
        let intId = 0;
        if (typeof id === "string") {
          intId = parseInt(id);
        }
        let val = await orderid.create({ value: intId });
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
