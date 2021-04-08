import { Theme } from "@material-ui/core/styles/createMuiTheme";
import styled from "@material-ui/core/styles/styled";

export const StyledForm = styled("form")<Theme>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  maxWidth: "500px",
  textAlign: "center",
  "& > *": {
    marginBottom: "20px",
  },
}));

export const PlayerCards = styled("div")<Theme>(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  flexWrap: "wrap",
  margin: "40px 0 100px 0",
  minHeight: "200px",
}));

export const Player = styled("div")<Theme>(({ theme }) => ({
  minWidth: "60px",
  textAlign: "center",
}));

export const PlayerCardScore = styled("p")<Theme>(({ theme }) => ({
  width: "74px",
  fontSize: "50px",
  lineHeight: "134px",
  margin: "0",
  textAlign: "center",
  position: "absolute",
}));

export const ScoreOptionCards = styled("div")<Theme>(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  alignItems: "flex-end",
  maxWidth: "800px",
  margin: "0 auto",
  "& > *": {
    textAlign: "center",
    width: "60px",
    height: "100px",
    fontSize: "30px",
    marginBottom: "20px",
  },
}));

export const ButtonContainer = styled("div")<Theme>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "120px",
  minHeight: "112px",
  "& > button": {
    width: "200px",
    marginBottom: "20px",
  },
}));

export const ColorfulName = styled("span")<Theme>(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "uppercase",
}));

export const FlippableCardContainer = styled("div")<Theme>(({ theme }) => ({
  width: "90px",
  height: "150px",
}));

export const DoneIcon = styled("div")<Theme>(({ theme }) => ({
  color: "#fafafa",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& > svg": {
    fontSize: "50px",
  },
}));

export const HeaderContent = styled("div")<Theme>(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
