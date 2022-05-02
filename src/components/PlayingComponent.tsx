import React from "react";
import { playerNames, playItems } from "../constants/playItems";
import { ScoreContext, ScoreContextType } from "../context/ScoreContext";
import { randomComputerChoice } from "../helper/gamelogic";
import PlayingAnimation from "./PlayingAnimation";

interface ChoiceProps {
  item: string,
  wins: string[],
  filePath: string,
}

const PlayingComponent = () => {
  const { player1Score, player2Score, gamingMode } = React.useContext(ScoreContext) as ScoreContextType;
  const [player1Choice, setPlayer1Choice] = React.useState<ChoiceProps | null>(null);
  const [player2Choice, setPlayer2Choice] = React.useState<ChoiceProps | null>(null);
  const [disableBtn, setDisableBtn] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (gamingMode === 'compVsComp' && !player1Choice && !player2Choice) {
      setPlayer1Choice(randomComputerChoice());
      setPlayer2Choice(randomComputerChoice());
    }
  }, [player1Choice, player2Choice])

  const handleNextRoundClick = () => {
    setDisableBtn(true);
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setTimeout(() => {
      setDisableBtn(false)
    }, 2000)
  }

  const handlePlayerChoiceClick = (choice: ChoiceProps) => {
    const computerChoice = randomComputerChoice();
    setPlayer2Choice(computerChoice);
    setPlayer1Choice(choice);
  }

  const showNextButton = () => {
    if (gamingMode === 'compVsComp') return true

    return !!player1Choice
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
          disabled={disableBtn}
        >
          Next Round
        </button>
      </div>
    )
  }

  const renderScore = () => {
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
      <PlayingAnimation
        player1Choice={player1Choice!}
        player2Choice={player2Choice!}
      />
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
