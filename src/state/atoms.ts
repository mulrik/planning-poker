import { atom } from "recoil";

export const startGameState = atom({
  key: "startGame",
  default: false,
});

export const playerState = atom({
  key: "player",
  default: {
    id: "",
    name: "",
    chosenScore: null,
    gameId: "",
  },
});

export const realtimePlayersState = atom({
  key: "realtimePlayers",
  default: [],
});
export const showCardsState = atom({
  key: "showCards",
  default: false,
});
export const finishedVotingState = atom({
  key: "finishedVoting",
  default: false,
});
