import React from 'react';
import Cookies from 'js-cookie';

export interface ScoreContextType {
  playerScore: number,
  computerScore: number,
  updateScore: (winner: string) => void,
  resetScore: () => void,
}

interface ContextProps {
  children?: React.ReactNode;
  playerScoreProp: number,
  computerScoreProp: number,
}

export const ScoreContext = React.createContext<ScoreContextType | null>(null);

const ScoreContextProvider: React.FC<ContextProps> = ({ children, playerScoreProp, computerScoreProp }) => {
  const [playerScore, setPlayerScore] = React.useState<number>(playerScoreProp || 0)
  const [computerScore, setComputerScore] = React.useState<number>(computerScoreProp || 0)

  React.useEffect(() => {
    Cookies.set('player-score', playerScore.toString());
    Cookies.set('computer-score', computerScore.toString());
  }, [playerScore, computerScore])

  const resetScore = () => {
    setPlayerScore(0);
    setComputerScore(0);
  }

  const updateScore = (winner: string) => {
    if (winner === "Tie") return

    if (winner === "Player") {
      setPlayerScore(playerScore + 1)
    } else {
      setComputerScore(computerScore + 1)
    }
  }

  return (
    <ScoreContext.Provider value={{ playerScore, computerScore, updateScore, resetScore }}>
      {children}
    </ScoreContext.Provider>
  )
}

export default ScoreContextProvider;
