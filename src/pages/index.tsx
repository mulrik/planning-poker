import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { StyledForm } from "../styles/styledComponents";

const Home = () => {
  const router = useRouter();

  const [game, setGame] = useState({ name: "", showCards: false });

  const createGame = async (event) => {
    event.preventDefault();
    const res = await axios.post("api/game", game);
    router.push(`/game/${res.data.id}`);
  };

  return (
    <main>
      <StyledForm noValidate autoComplete="off" onSubmit={createGame}>
        <h1>Planning poker</h1>
        <p>Get started! Choose a name for your planning poker game: </p>
        <TextField
          id="game-name"
          label="What's the name of the game?"
          variant="outlined"
          onChange={(e) => setGame({ ...game, name: e.target.value })}
        />
        <Button variant="contained" color="primary" type="submit">
          Create New Game
        </Button>
      </StyledForm>
    </main>
  );
};

export default Home;
