import React from 'react';
import './App.scss';
import ScoreContextProvider from './context/ScoreContext';
import HomeScreen from './components/HomeScreen';
import Cookies from 'js-cookie';

function App() {
  const playerScore = parseInt(Cookies.get('player-score') || '');
  const computerScore = parseInt(Cookies.get('computer-score') || '');

  return (
    <ScoreContextProvider playerScoreProp={playerScore} computerScoreProp={computerScore}>
      <div className='App'>
        <HomeScreen />
      </div>
    </ScoreContextProvider>
  );
}

export default App;
