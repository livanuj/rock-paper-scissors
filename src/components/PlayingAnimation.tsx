import React, { useContext } from "react";
import { player, playerNames, playItems } from "../constants/playItems";
import { ScoreContext, ScoreContextType } from "../context/ScoreContext";
import { getWinner } from "../helper/gamelogic";

interface PlayerChoiceProps {
  item: string,
  wins: string[],
  filePath: string,
}
interface PlayingAnimationProps {
  player1Choice?: PlayerChoiceProps,
  player2Choice?: PlayerChoiceProps,
}


const PlayingAnimation = ({ player1Choice, player2Choice }: PlayingAnimationProps) => {
  const { updateScore, gamingMode } = useContext(ScoreContext) as ScoreContextType;
  const [shakeHand, setShakeHand] = React.useState<boolean>(false);
  const [winner, setWinner] = React.useState<string | null>();

  React.useEffect(() => {
    if (!player1Choice || !player2Choice) return;

    setShakeHand(true)
    const winner = getWinner(player1Choice, player2Choice);
    setTimeout(() => {
      setShakeHand(false)
      updateScore(winner)
      setWinner(winner);
    }, 1000);
  }, [player1Choice]);

  const renderShakeHand = (handSide: string) => {
    if (!shakeHand) return

    return (
      <div>
        <img
          className={`shake-hand-image ${handSide}`}
          src={require(`../assets/rock.png`)}
          height="200"
          width="200"
        />
      </div>
    );
  }

  const renderPlayerChoice = () => {
    if (shakeHand) return renderShakeHand('left');
    const filePath = player1Choice?.filePath || playItems[0].filePath;

    return (
      <div>
        <img
          className={`chosen-hand-image left ${winner === "player1" ? "winner" : ""}`}
          src={require(`../assets/${filePath}`)}
          height="200"
          width="200"
        />
      </div>
    )
  }

  const renderComputerChoice = () => {
    if (shakeHand) return renderShakeHand('right');
    const filePath = player2Choice?.filePath || playItems[0].filePath;

    return (
      <div>
        <img
          className={`chosen-hand-image right ${winner === "player2" ? "winner" : ""}`}
          src={require(`../assets/${filePath}`)}
          height="200"
          width="200"
        />
      </div>
    )
  }

  const renderWinner = () => {
    if (!player1Choice || shakeHand) return;

    let winnerText = winner === "tie" ? "It's a tie" : `${playerNames[gamingMode][winner as keyof player]} wins`;

    return (
      <div className="winner-div">
        <h1>{winnerText}</h1>
      </div>
    );
  }

  return (
    <div className="playing-area-div">
      {renderWinner()}
      <div>
        <span><h2>{playerNames[gamingMode].player1} Chose</h2></span>
        {renderPlayerChoice()}
      </div>
      <div>
        <span><h2>{playerNames[gamingMode].player2} Chose</h2></span>
        {renderComputerChoice()}
      </div>
    </div>
  )
}

export default PlayingAnimation;