import React from 'react';
import { playerNames } from '../constants/playItems';
import { ScoreContext, ScoreContextType } from '../context/ScoreContext';
import PlayingComponent from './PlayingComponent';

const HomeScreen = () => {
  const {
    player1Score,
    player2Score,
    gamingMode,
    resetScore,
    handleGameMode,
  } = React.useContext(ScoreContext) as ScoreContextType;
  const [showHomePage, setShowHomePage] = React.useState<boolean>(true);
  const [startNewGame, setStartNewGame] = React.useState<boolean>(false);

  const handleNewGameClick = () => {
    resetScore();
    setShowHomePage(false);
    setStartNewGame(true);
  }

  const handleGameModeClick = (gameMode: string): void => {
    setStartNewGame(false)
    handleGameMode(gameMode)
  }

  const renderContinueMenu = () => {
    if (!player1Score && !player2Score) return null;

    return (
      <span
        className='clickable-span'
        onClick={() => setShowHomePage(false)}
      >
        <h2 style={{ marginBottom: 1 }}>Continue Game</h2>
        <span className='score-info'>
          ({playerNames[gamingMode].player1} - {player1Score} : {player2Score} - {playerNames[gamingMode].player2})
        </span>
      </span>
    );
  }

  const renderChoosePlayer = () => {
    return (
      <div className='home-screen-menu'>
        <span
          data-testid="player-vs-computer"
          className='clickable-span'
          onClick={() => handleGameModeClick('playerVsComp')}
        >
          <h2>Player Vs Computer</h2>
        </span>
        <span
          data-testid="computer-vs-computer"
          className='clickable-span'
          onClick={() => handleGameModeClick('compVsComp')}
        >
          <h2>Computer Vs Computer</h2>
        </span>
      </div>
    );
  }

  const renderHomeScreen = () => {
    return (
      <div className='home-screen-menu'>
        {renderContinueMenu()}
        <span
          data-testid="new-game-span"
          className='clickable-span'
          onClick={handleNewGameClick}
        >
          <h2>New Game</h2>
        </span>
      </div>
    );
  }

  const routeLogic = () => {

    if (showHomePage) return renderHomeScreen();

    if (startNewGame) return renderChoosePlayer();

    return <PlayingComponent />
  }

  return (
    <div data-testid="home-screen">
      <span
        className='clickable-span'
        onClick={() => setShowHomePage(true)}
      >
        <h1>Rock Paper Scissor</h1>
      </span>
      {routeLogic()}
    </div>
  )
}

export default HomeScreen;
