import React from "react";
import { useSpring, animated } from "react-spring";
import Paper from "@material-ui/core/Paper";
import DoneOutlineOutlinedIcon from "@material-ui/icons/DoneOutlineOutlined";
import {
  DoneIcon,
  FlippableCardContainer,
  PlayerCardScore,
} from "../styles/styledComponents";

type IFlippableCard = { flipped: boolean; content: string };

const FlippableCard = ({ flipped, content }: IFlippableCard) => {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  return (
    <FlippableCardContainer
      aria-label={
        content ? "player has chosen a score" : "player has not chosen a score"
      }
    >
      <animated.div
        className={`card ${content ? "front" : "front-no-score-chosen"}`}
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      >
        <Paper elevation={3}>
          {content && (
            <DoneIcon>
              <DoneOutlineOutlinedIcon />
            </DoneIcon>
          )}
        </Paper>
      </animated.div>
      <animated.div
        className="card back"
        style={{
          opacity,
          transform: transform.to((t) => `${t} rotateY(180deg)`),
        }}
      >
        <Paper elevation={3}>
          <PlayerCardScore>{content}</PlayerCardScore>
        </Paper>
      </animated.div>
    </FlippableCardContainer>
  );
};
export default FlippableCard;
