import React from 'react';
import './App.scss';
import ScoreContextProvider from './context/ScoreContext';
import HomeScreen from './components/HomeScreen';
import Cookies from 'js-cookie';
import { playerNames } from './constants/playItems';

function App() {
  const player1Score = parseInt(Cookies.get('player-1-score') || '');
  const player2Score = parseInt(Cookies.get('player-2-score') || '');
  let gameMode = Cookies.get('game-mode') || '';
  gameMode = Object.keys(playerNames).indexOf(gameMode) > -1 ? gameMode : 'playerVsComp';

  return (
    <ScoreContextProvider
      player1ScoreProp={player1Score}
      player2ScoreProp={player2Score}
      gameMode={gameMode}
    >
      <div className='App'>
        <HomeScreen />
      </div>
    </ScoreContextProvider>
  );
}

export default App;
