import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db/firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = await db.collection("players").add({
      ...req.body,
    });
    res.status(200).json({ id });
  } catch (e) {
    res.status(400).end();
  }
};
