import { playItems } from "../constants/playItems"


export const randomComputerChoice = () => {
  const random = Math.floor(Math.random() * playItems.length);

  return playItems[random];
}

export const getWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) {
    return 'Tie';
  }

  const playerIndex = playItems.findIndex(item => item.item === playerChoice);
  const computerIndex = playItems.findIndex(item => item.item === computerChoice);

  if (playItems[playerIndex].wins.includes(playItems[computerIndex].item)) {
    return 'Player';
  }

  return 'Computer';
}
