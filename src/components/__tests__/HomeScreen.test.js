import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import HomeScreen from '../HomeScreen';
import ScoreContextProvider from '../../context/ScoreContext';

test('renders Home Screen', () => {
  render(
    <ScoreContextProvider>
      <HomeScreen />
    </ScoreContextProvider>
  );
  const divElement = screen.getByTestId("home-screen"); 
  expect(divElement).toHaveTextContent("Rock Paper Scissor");
});
   
test('clicks New Game', () => {
  render(
    <ScoreContextProvider>
      <HomeScreen />
    </ScoreContextProvider>
  );
  const spanElement = screen.getByTestId("new-game-span");
  fireEvent.click(spanElement);
  const playerVsComputerComponent = screen.getByTestId("player-vs-computer");
  expect(playerVsComputerComponent).toHaveTextContent("Player Vs Computer");
  const computerVsComputerComponent = screen.getByTestId("computer-vs-computer");
  expect(computerVsComputerComponent).toHaveTextContent("Computer Vs Computer");
})
