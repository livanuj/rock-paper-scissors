import React from "react";
import { playItems } from "../constants/playItems";
import { randomComputerChoice } from "../helper/gamelogic";
import PlayingAnimation from "./PlayingAnimation";

interface PlayingComponentProps {
  player?: string,
}

interface ChoiceProps {
  item: string,
  wins: string[],
  filePath: string,
}

const PlayingComponent = ({ player }: PlayingComponentProps) => {
  const [playerChoice, setPlayerChoice] = React.useState<ChoiceProps | null>(null);
  const [computerChoice, setComputerChoice] = React.useState<ChoiceProps | null>(null);

  const handleNextRoundClick = () => {
    setPlayerChoice(null);
    setComputerChoice(null)
  }

  const handlePlayerChoiceClick = (choice: ChoiceProps) => {
    const computerChoice = randomComputerChoice();
    setComputerChoice(computerChoice);
    setPlayerChoice(choice);
  }

  const renderIcon = (index: number, playItem: any) => {
    const { item, filePath } = playItem;

    return (
      <div
        key={index}
        className="play-icon"
        onClick={() => handlePlayerChoiceClick(playItem)}
      >
        <img
          className="icon-image"
          src={require(`../assets/${filePath}`)}
          alt={item}
          height="100"
          width={`${300 / playItems.length}%`}
        />
        <span>{item}</span>
      </div>
    );
  }

  const renderNextGameButton = () => {
    if (!playerChoice)  return;

    return (
      <div className="next-button-div">
        <button
          className="next-round-button"
          onClick={handleNextRoundClick}
        >
          Next Round
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1>Rock Paper Sissor</h1>
      <PlayingAnimation
        playerChoice={playerChoice!}
        computerChoice={computerChoice!}
      />
      <div className="selection-div">
        <span><h3>Choose Wisely</h3></span>
        {renderNextGameButton()}
        <div className={`selection-choices-div ${!!playerChoice ? "selected" : ""}`}>
          { playItems.map((playItem, index) => renderIcon(index, playItem)) }
        </div>
      </div>
    </div>
  )
}

export default PlayingComponent;
