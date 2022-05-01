import React from 'react';
import { ScoreContext, ScoreContextType } from '../context/ScoreContext';
import PlayingComponent from './PlayingComponent';

const HomeScreen = () => {
  const {
    playerScore,
    computerScore,
    resetScore
  } = React.useContext(ScoreContext) as ScoreContextType;
  const [showHomePage, setShowHomePage] = React.useState<boolean>(true)

  const handleNewGameClick = () => {
    resetScore();
    setShowHomePage(false);
  }

  const renderContinueMenu = () => {
    if (!playerScore && !computerScore) return null;

    return (
      <span
        className='clickable-span'
        onClick={() => setShowHomePage(false)}
      >
        <h2>Continue Game</h2>
      </span>
    );
  }

  const renderHomeScreen = () => {
    return (
      <div className='home-screen-menu'>
        {renderContinueMenu()}
        <span
          className='clickable-span'
          onClick={handleNewGameClick}
        >
          <h2>New Game</h2>
        </span>
      </div>
    );
  }


  return (
    <div>
      <span
        className='clickable-span'
        onClick={() => setShowHomePage(true)}
      >
        <h1>Rock Paper Sissor</h1>
      </span>
      { showHomePage ? renderHomeScreen() : <PlayingComponent /> }
    </div>
  )
}

export default HomeScreen;
