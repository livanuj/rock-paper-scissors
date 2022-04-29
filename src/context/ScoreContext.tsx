import React from 'react';

export interface ScoreContextType {
  playerScore: number,
  computerScore: number,
  updateScore: (winner: string) => void,
}

interface ContextProps {
  children?: React.ReactNode;
}

export const ScoreContext = React.createContext<ScoreContextType | null>(null);

const ScoreContextProvider: React.FC<ContextProps> = ({ children }) => {
  const [playerScore, setPlayerScore] = React.useState<number>(0)
  const [computerScore, setComputerScore] = React.useState<number>(0)

  const updateScore = (winner: string) => {
    if (winner === "Tie") return

    if (winner === "Player") {
      setPlayerScore(playerScore + 1)
    } else {
      setComputerScore(computerScore + 1)
    }
  }

  return (
    <ScoreContext.Provider value={{ playerScore, computerScore, updateScore}}>
      {children}
    </ScoreContext.Provider>
  )
}

export default ScoreContextProvider;
