import React from 'react';
import { getPlayItems, getWinner, GetWinnerProps, startNewGame } from '../helper/restApi';
import { PlayItem } from '../constants/playItems';
import { mockUpdateGameMode, ResponseProp } from '../helper/gamelogic';

interface ContextProps {
  children?: React.ReactNode,
}

interface StateProps {
  playItems: PlayItem[],
  player1Choice: PlayItem | null,
  player2Choice: PlayItem | null,
  winner: string,
  player1Score: number,
  player2Score: number,
  gamingMode: string,
}

export interface ScoreContextType extends StateProps {
  resetScore: () => void,
  handleGameMode: (mode: string) => void,
  updatePlayerChoice: (item: PlayItem | null) => void,
}

export const ScoreContext = React.createContext<ScoreContextType | null>(null);

const ScoreContextProvider: React.FC<ContextProps> = ({ children }) => {
  const [state, setState] = React.useState<StateProps>({
    playItems: [],
    player1Choice: null,
    player2Choice: null,
    winner: '',
    player1Score: 0,
    player2Score: 0,
    gamingMode: 'playerVsComp',
  })

  React.useEffect(() => {
    async function fetchPlayItems() {
      try {
        const response: any = await getPlayItems();

        setState((prevState) => ({
          ...prevState,
          playItems: response.playItems,
          player1Score: response.player1Score,
          player2Score: response.player2Score,
          gamingMode: response.gameMode,
        }))
      } catch (err: any) {
        console.log(err.message)
      }
    }

    fetchPlayItems();
  }, [])

  const resetScore = async () => {
    try {
      const response: ResponseProp = await startNewGame();

      setState((prevState) => ({
        ...prevState,
        player1Score: response.player1Score,
        player2Score: response.player2Score,
        winner: '',
      }))
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const handleGameMode = async (mode: string) => {
    try {
      const response: ResponseProp = await mockUpdateGameMode(mode);

      setState((prevState) => ({
        ...prevState,
        gamingMode: response.gameMode,
      }))
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const updatePlayerChoice = async (item: PlayItem | null) => {
    const { gamingMode } = state
    if (!!item || gamingMode === 'compVsComp') {
      try {
        const payload: GetWinnerProps = { gameMode: gamingMode, playerChoice: item }
        const response: ResponseProp = await getWinner(payload);

        setState((prevState) => ({
          ...prevState,
          player1Choice: response.player1Choice,
          player2Choice: response.player2Choice,
          winner: response.winner,
          player1Score: response.player1Score,
          player2Score: response.player2Score,
        }))
      } catch (err: any) {
        console.log(err.message)
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        player1Choice: null,
        player2Choice: null,
        winner: '',
      }))
    }
  }

  return (
    <ScoreContext.Provider value={{ ...state, resetScore, handleGameMode, updatePlayerChoice }}>
      {children}
    </ScoreContext.Provider>
  )
}

export default ScoreContextProvider;
