import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db/firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    if (req.method === "DELETE") {
      await db.collection("players").doc(String(id)).delete();
      res.status(200).json("deleted");
    }
  } catch (e) {
    res.status(400).end();
  }
};
