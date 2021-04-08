import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db/firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const playersRef = db.collection("players");
    const snapshot = await playersRef.where("gameId", "==", req.body.id).get();
    let batch = db.batch();
    snapshot.forEach((doc) => {
      const playerDocRef = playersRef.doc(doc.id);
      batch.update(playerDocRef, { chosenScore: null });
    });
    const result = await batch.commit();
    res.status(200).json({ hej: "hej" });
  } catch (e) {
    res.status(400).end();
  }
};
