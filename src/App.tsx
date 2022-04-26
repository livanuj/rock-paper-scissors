import React from 'react';
import logo from './logo.svg';
import './App.scss';
import PlayingComponent from './components/PlayingComponent';

function App() {

  return (
    <div className='App'>
      {/* <h1>Rock Paper Sissor</h1>
      <div>
        <button>Player Vs Computer</button>
        <button>Computer Vs Computer</button>
      </div> */}
      <PlayingComponent />
    </div>
  );
}

export default App;
