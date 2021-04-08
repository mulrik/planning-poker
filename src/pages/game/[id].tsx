import Head from "next/head";
import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import db from "../../db/firebase";
import ChooseNameForm from "../../components/ChooseNameForm";
import { useRecoilState } from "recoil";
import {
  playerState,
  realtimePlayersState,
  showCardsState,
  startGameState,
} from "../../state/atoms";
import Players from "../../components/Players";
import ScoreOptions from "../../components/ScoreOptions";
import { ColorfulName, HeaderContent } from "../../styles/styledComponents";
import firebaseClient from "../../db/firebaseClient";
import ShareDialog from "../../components/ShareDialog";

type IGameProps = { id: string; name: string };

const Game = ({ id, name }: IGameProps) => {
  const [startGame] = useRecoilState(startGameState);
  const [realtimePlayers, setRealtimePlayers] = useRecoilState(
    realtimePlayersState
  );
  const [showCards, setShowCards] = useRecoilState(showCardsState);
  const [player, setPlayer] = useRecoilState(playerState);

  const clientdb = firebaseClient.firestore();

  useEffect(() => {
    const unsubscribe = clientdb
      .collection("players")
      .where("gameId", "==", id)
      .onSnapshot((querySnapshot) => {
        let players = [];
        querySnapshot.docs.forEach((doc) => {
          const player = doc.data();
          players.push({
            name: player.name,
            id: doc.id,
            gameId: player.gameId,
            chosenScore: player.chosenScore,
          });
        });
        setRealtimePlayers(players);
        const me = players.find((p) => p.name === player.name);
        if (me) {
          setPlayer((prev) => ({ ...prev, chosenScore: me.chosenScore }));
        }
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = clientdb
      .collection("games")
      .doc(id)
      .onSnapshot((doc) => {
        const data = doc.data();

        setShowCards(data.showCards);
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Head>
        <title> Planning poker - {name}</title>
      </Head>
      <main>
        {!startGame && <ChooseNameForm gameName={name} gameId={id} />}
        {startGame && (
          <>
            <HeaderContent>
              <div>
                <h1>
                  Planning Poker - <ColorfulName>{name}</ColorfulName>
                </h1>
                <p>Choose a score and wait for others to do the same!</p>
              </div>
              <ShareDialog />
            </HeaderContent>
            <Players gameId={id} />
            <ScoreOptions />
          </>
        )}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx.params?.id;
    const gameDoc = await db.collection("games").doc(String(id)).get();
    const gameData = gameDoc.data();
    return {
      props: {
        id: id || "",
        name: gameData.name || "",
      },
    };
  } catch (error) {
    console.error(error.response);
    return { props: {} };
  }
};

export default Game;
