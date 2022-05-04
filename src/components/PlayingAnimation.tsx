import React, { useContext } from "react";
import { Player, playerNames } from "../constants/playItems";
import { ScoreContext, ScoreContextType } from "../context/ScoreContext";

interface PlayingAnimationProps {
  startAnimation: boolean
}

const PlayingAnimation = ({ startAnimation }: PlayingAnimationProps) => {
  const { playItems, player1Choice, player2Choice, gamingMode, winner } = useContext(ScoreContext) as ScoreContextType;

  const renderShakeHand = (handSide: string) => {
    if (!startAnimation) return

    return (
      <div>
        <img
          className={`shake-hand-image ${handSide}`}
          src={require(`../assets/rock.png`)}
          alt="rock"
          height="200"
          width="200"
        />
      </div>
    );
  }

  const renderPlayerChoice = () => {
    if (startAnimation) return renderShakeHand('left');
    const filePath = player1Choice?.filePath || playItems[0].filePath;

    return (
      <div>
        <img
          className={`chosen-hand-image left ${winner === "player1" ? "winner" : ""}`}
          src={require(`../assets/${filePath}`)}
          alt={player1Choice?.item}
          height="200"
          width="200"
        />
      </div>
    )
  }

  const renderComputerChoice = () => {
    if (startAnimation) return renderShakeHand('right');
    const filePath = player2Choice?.filePath || playItems[0].filePath;

    return (
      <div>
        <img
          className={`chosen-hand-image right ${winner === "player2" ? "winner" : ""}`}
          src={require(`../assets/${filePath}`)}
          alt={player2Choice?.item}
          height="200"
          width="200"
        />
      </div>
    )
  }

  const renderWinner = () => {
    if (!player1Choice || startAnimation || !winner) return;

    let winnerText = winner === "tie" ? "It's a tie" : `${playerNames[gamingMode][winner as keyof Player]} wins`;

    return (
      <div className="winner-div">
        <h1>{winnerText}</h1>
      </div>
    );
  }

  if (!gamingMode) return <div>Loading...</div>

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