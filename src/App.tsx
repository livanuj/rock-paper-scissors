import './App.scss';
import ScoreContextProvider from './context/ScoreContext';
import HomeScreen from './components/HomeScreen';

function App() {

  return (
    <ScoreContextProvider>
      <div className='App'>
        <HomeScreen />
      </div>
    </ScoreContextProvider>
  );
}

export default App;
