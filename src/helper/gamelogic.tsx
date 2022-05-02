import { playItems } from "../constants/playItems"

interface ChoicesProps {
  item: string,
  wins: string[],
  filePath: string,
}

export const randomComputerChoice = (): ChoicesProps => {
  const random = Math.floor(Math.random() * playItems.length);

  return playItems[random];
}

export const getWinner = (player1Choice: ChoicesProps, player2Choice: ChoicesProps): string => {
  if (player1Choice.item === player2Choice.item)
    return 'tie';

  if (player1Choice.wins.indexOf(player2Choice.item) > -1)
    return 'player1';

  return 'player2';
}
