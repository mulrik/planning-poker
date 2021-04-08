import React, { useEffect } from "react";
import {
  ButtonContainer,
  Player,
  PlayerCards,
} from "../styles/styledComponents";
import Button from "@material-ui/core/Button";
import { useRecoilState } from "recoil";
import {
  finishedVotingState,
  playerState,
  realtimePlayersState,
  showCardsState,
} from "../state/atoms";
import FlippableCard from "./FlippableCard";
import axios from "axios";

const Players = ({ gameId }: { gameId: string }) => {
  const [realtimePlayers] = useRecoilState(realtimePlayersState);
  const [showCards, setShowCards] = useRecoilState(showCardsState);
  const [finishedVoting, setFinishedVoting] = useRecoilState(
    finishedVotingState
  );
  const [player, setPlayer] = useRecoilState(playerState);

  const startNewVote = (event) => {
    event.preventDefault();
    axios.post("/api/game/revealCards", { id: gameId, showCards: false });
    axios.post("/api/player/resetAllScores", { id: gameId });
    setPlayer((prev) => ({ ...prev, chosenScore: null }));
  };
  const revealcards = (event) => {
    event.preventDefault();
    axios.post("/api/game/revealCards", { id: gameId, showCards: true });
  };

  const ensureChosenScores = () => {
    return realtimePlayers.some((p) => p.chosenScore === null) ? false : true;
  };
  useEffect(() => {
    const everyoneHasVoted = ensureChosenScores();
    setFinishedVoting(everyoneHasVoted);
  }, [realtimePlayers]);

  useEffect(() => {
    return () => {
      window.addEventListener("beforeunload", function (e) {
        return axios.delete(`/api/player/${player.id}`);
      });
    };
  });

  return (
    <>
      <PlayerCards>
        {realtimePlayers.map((p) => (
          <Player key={p.name}>
            <p>{p.name}</p>
            <FlippableCard flipped={showCards} content={p.chosenScore} />
          </Player>
        ))}
      </PlayerCards>
      <ButtonContainer>
        <Button
          disabled={!finishedVoting}
          variant="contained"
          color="primary"
          onClick={revealcards}
        >
          Show all scores
        </Button>
        {finishedVoting && (
          <Button variant="outlined" color="primary" onClick={startNewVote}>
            New vote
          </Button>
        )}
      </ButtonContainer>
    </>
  );
};
export default Players;
