import React from "react";
import { playItems } from "../constants/playItems";
import { getWinner } from "../helper/gamelogic";

interface PlayerChoiceProps {
  item: string,
  wins: string[],
  filePath: string,
}
interface PlayingAnimationProps {
  playerChoice?: PlayerChoiceProps,
  computerChoice?: PlayerChoiceProps,
}


const PlayingAnimation = ({ playerChoice, computerChoice }: PlayingAnimationProps) => {
  const [shakeHand, setShakeHand] = React.useState<boolean>(false);
  const [winner, setWinner] = React.useState<string>("");

  React.useEffect(() => {
    if (!playerChoice || !computerChoice) return;

    setShakeHand(true)
    const winner = getWinner(playerChoice, computerChoice);
    setTimeout(() => setShakeHand(false), 1000);
    setWinner(winner);
  }, [playerChoice]);

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
    const filePath = playerChoice?.filePath || playItems[0].filePath;

    return (
      <div>
        <img
          className={`chosen-hand-image left ${winner === "Player" ? "winner" : ""}`}
          src={require(`../assets/${filePath}`)}
          height="200"
          width="200"
        />
      </div>
    )
  }

  const renderComputerChoice = () => {
    if (shakeHand) return renderShakeHand('right');
    const filePath = computerChoice?.filePath || playItems[0].filePath;

    return (
      <div>
        <img
          className={`chosen-hand-image right ${winner === "Computer" ? "winner" : ""}`}
          src={require(`../assets/${filePath}`)}
          height="200"
          width="200"
        />
      </div>
    )
  }

  const renderWinner = () => {
    if (!playerChoice || shakeHand) return;
    let winnerText = winner === "Tie" ? "It's a tie" : `${winner} wins`;

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
        <span><h2>Player Chose</h2></span>
        {renderPlayerChoice()}
      </div>
      <div>
        <span><h2>Computer Chose</h2></span>
        {renderComputerChoice()}
      </div>
    </div>
  )
}

export default PlayingAnimation;