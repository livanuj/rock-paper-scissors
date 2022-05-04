import { playItems } from "../../constants/playItems";
import { mockBackedGetWinner, mockBackendGetPlayItems } from "../gamelogic";

test('Get Play Items from mock backend', () => {
  const data = mockBackendGetPlayItems();
  expect(data.status).toBe("success");

  const items = data.playItems;
  expect(items).toBeDefined();
  expect(items.length).toBeGreaterThan(0);
  expect(items).toEqual(playItems);
});

test('Get Winner from mock backend', () => {
  const payload = {
    gameMode: "playerVsComp",
    playerChoice: playItems[0],
  }
  const data = mockBackedGetWinner(payload);
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
})
