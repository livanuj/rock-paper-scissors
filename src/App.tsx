import React from 'react';
import logo from './logo.svg';
import './App.scss';
import PlayingComponent from './components/PlayingComponent';
import ScoreContextProvider from './context/ScoreContext';

function App() {

  return (
    <ScoreContextProvider>
      <div className='App'>
        <PlayingComponent />
      </div>
    </ScoreContextProvider>
  );
}

export default App;
