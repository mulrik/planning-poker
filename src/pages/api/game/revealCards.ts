import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db/firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const gameRef = db.collection("games").doc(req.body.id);
    const result = await gameRef.update({
      showCards: req.body.showCards,
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).end();
  }
};
