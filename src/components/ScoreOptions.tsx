import React, { useEffect } from "react";
import { ScoreOptionCards } from "../styles/styledComponents";
import { useRecoilState } from "recoil";
import { playerState } from "../state/atoms";
import axios from "axios";
import Paper from "@material-ui/core/Paper";

// type IChooseNameForm = { gameName: string; gameId: string };

const ScoreOptions = () => {
  const [player, setPlayer] = useRecoilState(playerState);

  const options = ["0", "1/2", "1", "2", "3", "5", "8", "13", "?"];

  useEffect(() => {
    if (player.chosenScore) {
      axios.post("/api/player/updateScore", player);
    }
  }, [player]);

  return (
    <ScoreOptionCards>
      {options.map((o) => (
        <Paper
          elevation={3}
          key={o}
          onClick={() => setPlayer((prev) => ({ ...prev, chosenScore: o }))}
          style={
            player.chosenScore === o
              ? { background: "#ff6f61a6", marginBottom: "40px" }
              : {}
          }
        >
          <p>{o}</p>
        </Paper>
      ))}
    </ScoreOptionCards>
  );
};
export default ScoreOptions;
