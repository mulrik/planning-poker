import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db/firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const doc = await db.collection("games").doc(String(id)).get();
    res.status(200).json(doc.data());
  } catch (e) {
    res.status(400).end();
  }
};
