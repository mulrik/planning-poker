import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db/firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const gameRef = db.collection("players").doc(req.body.id);
    const result = await gameRef.update({
      chosenScore: req.body.chosenScore,
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).end();
  }
};
