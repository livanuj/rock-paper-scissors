export interface PlayItem {
  item: string;
  wins: string[];
  filePath: string;
}

export interface Player {
  player1: string;
  player2: string;
}

export interface PlayerName {
  [key: string]: Player,
}

export const playItems:PlayItem[] = [
  {
    item: 'Rock',
    wins: ['Scissor'],
    filePath: 'rock.png',
  }, {
    item: 'Paper',
    wins: ['Rock'],
    filePath: 'paper.png',
  }, {
    item: 'Scissor',
    wins: ['Paper'],
    filePath: 'scissor.png',
  }
  // {
  //   item: 'Rock',
  //   wins: ['Scissors', 'Lizard'],
  //   filePath: 'rock.png',
  // }, { 
  //   item: 'Paper',
  //   wins: ['Rock', 'Spock'],
  //   filePath: 'paper.png',
  // }, { 
  //   item: 'Scissor',
  //   wins: ['Paper', 'Lizard'],
  //   filePath: 'scissor.png',
  // }, {
  //   item: 'Lizard',
  //   wins: ['Spock', 'Paper'],
  //   filePath: 'logo.svg',
  // }, {
  //   item: 'Spock',
  //   wins: ['Rock', 'Scissor'],
  //   filePath: 'logo.svg',
  // }
]

export const playerNames:PlayerName = {
  playerVsComp: {
    player1: 'Player',
    player2: 'Computer' 
  },
  compVsComp: { 
    player1: 'Computer 1',
    player2: 'Computer 2',
  }
}
