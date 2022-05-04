import { PlayItem } from "../constants/playItems"
import {
  mockBackedGetWinner,
  mockBackendGetPlayItems,
  mockStartNewGame,
  mockUpdateGameMode,
  ResponseProp } from "./gamelogic"

export interface GetWinnerProps {
  playerChoice: PlayItem | null,
  gameMode: string,
}

export const getWinner = (payload: GetWinnerProps): Promise<ResponseProp> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = mockBackedGetWinner(payload)
      if (response.status === 'success') {
        resolve(response)
      } else {
        reject(response)
      }
    }, 1000)
  })
}

export const getPlayItems = (): Promise<ResponseProp> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = mockBackendGetPlayItems()
      if (response.status === 'success') {
        resolve(response)
      } else {
        reject(response)
      }
    }, 1000)
  })
}

export const startNewGame = (): Promise<ResponseProp> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = mockStartNewGame()
      if (response.status === 'success') {
        resolve(response)
      } else {
        reject(response)
      }
    }, 1000)
  });
}

export const updateGameMode = (gameMode: string): Promise<ResponseProp> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = mockUpdateGameMode(gameMode)
      if (response.status === 'success') {
        resolve(response)
      } else {
        reject(response)
      }
    }, 1000)
  })
}
