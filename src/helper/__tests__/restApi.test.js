import { playItems } from "../../constants/playItems";
import { mockUpdateGameMode } from "../gamelogic";
import { getPlayItems, getWinner, startNewGame } from "../restApi"


test('API test for getWinner', async () => {
  const payload = {
    gameMode: "playerVsComp",
    playerChoice: playItems[0],
  }

  const data = await getWinner(payload);
  expect(data.status).toBe("success");

  const winner = data.winner;
  const computerChoice = data.player2Choice;
  const playerChoice = payload.playerChoice

  let expectedWinner;
  if (computerChoice.item === playerChoice.item) {
    expectedWinner = "tie"
  } else if (playerChoice.wins.indexOf(computerChoice.item) > -1) {
    expectedWinner = "player1"
  } else if (computerChoice.wins.indexOf(playerChoice.item) > -1) {
    expectedWinner = "player2"
  }

  expect(winner).toBeDefined();
  expect(winner).toBe(expectedWinner);
});

test('API test for getPlayItems', async () => {
  const data = await getPlayItems();
  expect(data.status).toBe("success");

  const items = data.playItems;
  expect(items).toBeDefined();
  expect(items.length).toBeGreaterThan(0);
  expect(items).toEqual(playItems);
});

test('API test for startNewGame', async () => {
  const data = await startNewGame();
  expect(data.status).toBe("success");

  expect(data.player1Score).toBe(0);
  expect(data.player2Score).toBe(0);
})

test('API test for mockUpdateGameMode', async () => {
  const gameMode = "playerVsComp";
  const data = await mockUpdateGameMode(gameMode);
  expect(data.status).toBe("success");
  expect(data.gameMode).toBe(gameMode);
});
