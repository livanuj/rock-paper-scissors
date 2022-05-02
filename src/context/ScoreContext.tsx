import React from 'react';
import Cookies from 'js-cookie';

export interface ScoreContextType {
  player1Score: number,
  player2Score: number,
  gamingMode: string,
  updateScore: (winner: string) => void,
  resetScore: () => void,
  handleGameMode: (mode: string) => void,
}

interface ContextProps {
  children?: React.ReactNode;
  player1ScoreProp: number,
  player2ScoreProp: number,
  gameMode: string,
}

export const ScoreContext = React.createContext<ScoreContextType | null>(null);

const ScoreContextProvider: React.FC<ContextProps> = ({ children, player1ScoreProp, player2ScoreProp, gameMode }) => {
  const [player1Score, setPlayer1Score] = React.useState<number>(player1ScoreProp || 0)
  const [player2Score, setPlayer2Score] = React.useState<number>(player2ScoreProp || 0)
  const [gamingMode, setGamingMode] = React.useState<string>(gameMode || "playerVsComp")

  React.useEffect(() => {
    Cookies.set('player-1-score', player1Score.toString());
    Cookies.set('player-2-score', player2Score.toString());
    Cookies.set('game-mode', gamingMode.toString());
  }, [player1Score, player2Score, gamingMode])

  const resetScore = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
  }

  const handleGameMode = (mode: string) => {
    setGamingMode(mode);
  }

  const updateScore = (winner: string) => {
    console.log('i am here', winner)
    if (winner === "tie") return

    if (winner === "player1") {
      setPlayer1Score(player1Score + 1)
    } else {
      setPlayer2Score(player2Score + 1)
    }
  }

  return (
    <ScoreContext.Provider value={{ player1Score, player2Score, updateScore, resetScore, gamingMode, handleGameMode }}>
      {children}
    </ScoreContext.Provider>
  )
}

export default ScoreContextProvider;
