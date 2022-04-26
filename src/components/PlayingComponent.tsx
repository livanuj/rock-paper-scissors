import React from "react";
import { playItems } from "../constants/playItems";
import PlayingAnimation from "./PlayingAnimation";

interface PlayingComponentProps {
  player?: string,
}

const PlayingComponent = ({ player }: PlayingComponentProps) => {
  const [playerChoice, setPlayerChoice] = React.useState<string>("");

  const renderIcon = (index: number, playItem: any) => {
    const { item, filePath } = playItem;

    return (
      <div
        key={index}
        className="play-icon"
        onClick={() => setPlayerChoice(item)}
      >
        <img
          className={`icon-image icon-${item.toLowerCase()}`}
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
    if (playerChoice === "") return;

    return (
      <div className="next-button">
        <button onClick={() => setPlayerChoice("")}>Next Round</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Rock Paper Sissor</h1>
      <PlayingAnimation playerChoice={playerChoice} />
      <div className="selection-div">
        <span><h3>Choose Wisely</h3></span>
        {renderNextGameButton()}
        <div className={`selection-choices-div ${playerChoice !== "" ? "selected" : ""}`}>
          { playItems.map((playItem, index) => renderIcon(index, playItem)) }
        </div>
      </div>
    </div>
  )
}

export default PlayingComponent;

// const PlayingComponent: React.FC<{}> = () => {
// }
