import Cookies from "js-cookie"
import { PlayItem, playItems } from "../constants/playItems"
import { GetWinnerProps } from "./restApi";

export interface ResponseProp {
  status: string,
  [key: string]: any,
}

const COOKIES_MAPPER:{[key: string]: string} = {
  player1: 'player-1-score',
  player2: 'player-2-score',
  gameMode: 'game-mode',
}

export const mockBackedGetWinner = (payload: GetWinnerProps): ResponseProp => {
  let { playerChoice, gameMode } = payload;

  if (gameMode === 'compVsComp' || !playerChoice) {
    playerChoice = randomComputerChoice();
  }

  if (playItems.indexOf(playerChoice) > -1) {
    const computerChoice = randomComputerChoice();
    const winner = getWinner(playerChoice, computerChoice)
    if (winner !== 'tie') {
      updateScore(winner)
    }

    return {
      status: 'success',
      winner: winner,
      player1Choice: playerChoice,
      player2Choice: computerChoice,
      player1Score: parseInt(getValueFromCookies('player1')),
      player2Score: parseInt(getValueFromCookies('player2')),
    }
  } else {
    return {
      status: 'error',
      message: 'Something went wrong!!!'
    }
  }
}

export const mockBackendGetPlayItems = (): ResponseProp => {
  return {
    status: 'success',
    playItems: playItems,
    player1Score: parseInt(getValueFromCookies('player1')),
    player2Score: parseInt(getValueFromCookies('player2')),
    gameMode: getValueFromCookies('gameMode'),
  }
}

export const mockStartNewGame = (): ResponseProp => { 
  updateCookies('player1', 0);
  updateCookies('player2', 0);

  return {
    status: 'success',
    player1Score: parseInt(getValueFromCookies('player1')),
    player2Score: parseInt(getValueFromCookies('player2')),
  }
}

export const mockUpdateGameMode = (gameMode: string): ResponseProp => {
  updateCookies('gameMode', gameMode)

  return {
    status: 'success',
    gameMode: gameMode,
  }
}

const getValueFromCookies = (name: string):string => {
  const cookieName = COOKIES_MAPPER[name]
  return Cookies.get(cookieName) || ""
}

const updateCookies = (player: string, score: number | string) => {
  Cookies.set(COOKIES_MAPPER[player], score.toString(), { sameSite: 'None', secure: true })
}

const updateScore = (winner: string): void => {
  const score = getValueFromCookies(winner)
  let updatedScore = parseInt(score || '') + 1
  updateCookies(winner, updatedScore)
}

const randomComputerChoice = (): PlayItem => {
  const random = Math.floor(Math.random() * playItems.length);

  return playItems[random];
}

const getWinner = (player1Choice: PlayItem, player2Choice: PlayItem): string => {
  if (player1Choice.item === player2Choice.item)
    return 'tie';

  if (player1Choice.wins.indexOf(player2Choice.item) > -1)
    return 'player1';

  return 'player2';
}
