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

export const getWinner = (playerChoice: ChoicesProps, computerChoice: ChoicesProps): string => {
  if (playerChoice.item === computerChoice.item)
    return 'Tie';

  if (playerChoice.wins.indexOf(computerChoice.item) > -1)
    return 'Player';

  return 'Computer';
}
