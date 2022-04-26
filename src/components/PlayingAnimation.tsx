import React from "react";
import { getWinner, randomComputerChoice } from "../helper/gamelogic";

interface PlayingAnimationProps {
  playerChoice: string,
}

const PlayingAnimation = ({ playerChoice }: PlayingAnimationProps) => {
  const [computerChoice, setComputerChoice] = React.useState<string>("");

  React.useEffect(() => {
    if (playerChoice === "") return;

    const computerChoice = randomComputerChoice();
    setComputerChoice(computerChoice.item);
    const winner = getWinner(playerChoice, computerChoice.item);
    console.log(winner);
  }, [playerChoice]);

  return (
    <div className="playing-area-div">
      <div>
        <span><h2>Player Chose</h2></span>
        {playerChoice}
      </div>
      <div>
        <span><h2>Computer Chose</h2></span>
        {computerChoice}
      </div>
    </div>
  )
}

export default PlayingAnimation;