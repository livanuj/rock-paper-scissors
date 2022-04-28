import React from "react";
import { playItems } from "../constants/playItems";
import { getWinner, randomComputerChoice } from "../helper/gamelogic";

interface PlayingAnimationProps {
  playerChoice: string,
}

interface PlayerChoiceObject {
  filePath: string,
}

const PlayingAnimation = ({ playerChoice }: PlayingAnimationProps) => {
  const [computerChoice, setComputerChoice] = React.useState<string>("");
  const [shakeHand, setShakeHand] = React.useState<boolean>(false);
  const [winner, setWinner] = React.useState<string>("");

  React.useEffect(() => {
    if (playerChoice === "") return;

    setShakeHand(true)
    const computerChoice = randomComputerChoice();
    setComputerChoice(computerChoice.item);
    const winner = getWinner(playerChoice, computerChoice.item);
    setTimeout(() => {
      setShakeHand(false)
    }, 1000);
    setWinner(winner);
  }, [playerChoice]);

  const findChosenObject = (choice: string) => {
    return playItems.find(item => item.item === choice) || playItems[0];
  }

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
    if (playerChoice === "" || shakeHand) return renderShakeHand('left');

    const { filePath }: PlayerChoiceObject = findChosenObject(playerChoice);
    return (
      <div>
        <img
          className="chosen-hand-image left"
          src={require(`../assets/${filePath}`)}
          height="200"
          width="200"
        />
      </div>
    )
  }

  const renderComputerChoice = () => {
    if (playerChoice === "" || shakeHand) return renderShakeHand('right');

    const { filePath }: PlayerChoiceObject = findChosenObject(computerChoice);
    return (
      <div>
        <img
          className="chosen-hand-image right"
          src={require(`../assets/${filePath}`)}
          height="200"
          width="200"
        />
      </div>
    )
  }

  const renderWinner = () => {
    if (playerChoice === "" || shakeHand) return;
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