import React, { useEffect, useState } from "react";
import { ColorfulName, StyledForm } from "../styles/styledComponents";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRecoilState } from "recoil";
import {
  startGameState,
  playerState,
  realtimePlayersState,
} from "../state/atoms";
import axios from "axios";
import { useSpring, animated } from "react-spring";

type IChooseNameForm = { gameName: string; gameId: string };

const ChooseNameForm = ({ gameName, gameId }: IChooseNameForm) => {
  const [startGame, setStartGame] = useRecoilState(startGameState);
  const [player, setPlayer] = useRecoilState(playerState);
  const [realtimePlayers, setRealtimePlayers] = useRecoilState(
    realtimePlayersState
  );

  const [validationError, setValidationError] = useState("");

  const { x } = useSpring({
    from: { x: 0 },
    x: 1,
    config: { duration: 1000 },
  });

  useEffect(() => {
    const playerNameFromLocalStorage = localStorage.getItem("player");
    playerNameFromLocalStorage
      ? setPlayer({
          name: playerNameFromLocalStorage,
          chosenScore: null,
          id: "",
          gameId: gameId,
        })
      : setPlayer({ name: "", chosenScore: null, id: "", gameId: gameId });
  }, []);

  const getStarted = async (event) => {
    event.preventDefault();
    localStorage.setItem("player", player.name);
    if (realtimePlayers.some((p) => p.name === player.name)) {
      setValidationError(
        "Someone with this name is already in this game! Please choose another name :)"
      );
      return;
    }
    if (realtimePlayers.length >= 10) {
      setValidationError("Oh no, there's already 10 players...");
      return;
    }
    const newPlayer = {
      name: player.name,
      chosenScore: null,
      gameId: gameId,
    };
    const res = await axios.post("/api/player", newPlayer);
    setPlayer((prev) => ({ ...prev, id: res.data.id }));
    setStartGame(true);
  };

  return (
    <StyledForm noValidate autoComplete="off" onSubmit={getStarted}>
      <animated.h1
        style={{
          opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
          transform: x
            .to({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
            })
            .to((x) => `scale(${x})`),
        }}
      >
        Welcome to <ColorfulName>{gameName}</ColorfulName>
      </animated.h1>
      <p>Choose an alias please :)</p>
      <div>
        <TextField
          id="name"
          label="Your name"
          variant="outlined"
          value={player.name}
          onChange={(e) =>
            setPlayer((prev) => ({ ...prev, name: e.target.value }))
          }
          helperText={validationError}
          fullWidth
        />
      </div>
      <Button variant="contained" color="primary" type="submit">
        Get started
      </Button>
    </StyledForm>
  );
};
export default ChooseNameForm;
