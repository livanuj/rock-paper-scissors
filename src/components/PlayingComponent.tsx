import React from "react";
import { playerNames, PlayItem, playItems } from "../constants/playItems";
import { ScoreContext, ScoreContextType } from "../context/ScoreContext";
import PlayingAnimation from "./PlayingAnimation";

const PlayingComponent = () => {
  const {
    player1Score,
    player2Score,
    gamingMode,
    player1Choice,
    winner,
    updatePlayerChoice,
  } = React.useContext(ScoreContext) as ScoreContextType;
  const [startAnimation, setStartAnimation] = React.useState<boolean>(false);

  const handleNextRoundClick = () => {
    if (gamingMode === 'compVsComp')
      startAnimatingHands();

    updatePlayerChoice(null);
  }

  const handlePlayerChoiceClick = (choice: PlayItem) => {
    startAnimatingHands()
    updatePlayerChoice(choice)
  }

  const startAnimatingHands = () => {
    setStartAnimation(true);
    setTimeout(() => {
      setStartAnimation(false)
    }, 1000)
  }

  const showNextButton = () => {
    if (gamingMode === 'compVsComp') return true

    return !!player1Choice && !!winner
  }

  const renderIcon = (index: number, playItem: PlayItem) => {
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
          height="80px"
          width="80px"
        />
        <span>{item}</span>
      </div>
    );
  }

  const renderNextGameButton = () => {
    if (!showNextButton())  return;

    return (
      <div className="next-button-div">
        <button
          className="next-round-button"
          onClick={handleNextRoundClick}
          disabled={startAnimation}
        >
          Next Round
        </button>
      </div>
    )
  }

  const renderScore = () => {
    if (!gamingMode) return;

    return (
      <div className="score-div">
        <div className="score-name" style={{ color: player1Score >= player2Score ? 'green' : 'red' }}>
          <div className="score-player-name">
            <p>{playerNames[gamingMode].player1}</p>
          </div>
          <span className="score-number">{player1Score}</span>
        </div>
        <div>:</div>
        <div style={{ color: player2Score >= player1Score ? 'green' : 'red' }}>
          <div>
            <p>{playerNames[gamingMode].player2}</p>
          </div>
          <span className="score-number">{player2Score}</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      {renderScore()}
      <PlayingAnimation startAnimation={startAnimation} />
      <div className="selection-div">
        <span><h3>Choose Wisely</h3></span>
        {renderNextGameButton()}
        <div className={`selection-choices-div ${showNextButton() ? "selected" : ""}`}>
          { playItems.map((playItem, index) => renderIcon(index, playItem)) }
        </div>
      </div>
    </div>
  )
}

export default PlayingComponent;
