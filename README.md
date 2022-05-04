# Read Me

## start by cloning the repository

`git clone git@github.com:livanuj/rock-paper-scissors.git`

## Install Yarn if you haven't

`npm install --global yarn`

If any problem occured while installing yarn, please refer 
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-the-yarn-package-manager-for-node-js


## If yarn is already installed.

`yarn install`

to install the packages. This might take few minutes.

## After completing installtion,

`yarn start`

Game will automatically open in the browser.  If not, open `localhost:3000` 

# Game Details


## Start new game

Chose either `Player Vs Computer` OR `Computer Vs Computer`

## Player Vs Computer

Compete against the mighty computer.

Choose either Rock, Paper Or Scissor, and see the animation as we play in Real Life.

## Computer Vs Computer
Let computer compete agains each other.

Only `Next Round` button is active in this case. Click the button to see the computers play.


## To add more players
find `src/constants/playItems.ts`

add items(Object) into the array in following format
```
{
  item: 'Lizard', // string
  wins: ['Scissor', 'Rock'], // array
  filePath: 'lizard.png', // string with file extension
}
```
Also add, a png image of dimention approx. `793 × 785` pixels inside `src/assets/`.
And the filename should be as it is mentioned in filePath attribute.

Want to change the name of Player/Computer OR Computer1/Computer2?
find `src/constants/playItems.ts`

in variable `playerNames`. change the name as desired for

```
{
  playerVsComp: {
    player1: 'Rookie',
    player2: 'Legendary' 
  },
  compVsComp: { 
    player1: 'Liverpool',
    player2: 'Manchester Utd',
  }
}
```

Player Vs Computer => `playerVsComp`
Computer Vs Computer => `compVsComp`


## Scoring

Scoring adds 1 point to the winning player. If it's a tie. No points will be added.

Score and game mode are stored in Cookies.

## Game Logic
No API is used, however the game is developed while mocking the API in such a way that adding the endpoints in specific functions in file `src/helper/restApi.ts` will work.

# rock-paper-scissors
## Please feel free to play around with it...
