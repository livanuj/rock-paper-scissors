import React from 'react';
import { render, screen } from '@testing-library/react';
import ScoreContextProvider from '../../context/ScoreContext';
import PlayingAnimation from '../PlayingAnimation';
import { playerNames } from '../../constants/playItems';

test('renders Playing Component', () => {
  render(
    <ScoreContextProvider>
      <PlayingAnimation />
    </ScoreContextProvider>
  );
  const divElement = screen.getByTestId("playing-area"); 
  expect(divElement).toHaveTextContent(`${playerNames['playerVsComp'].player1} Chose`);
  expect(divElement).toHaveTextContent(`${playerNames['playerVsComp'].player2} Chose`);
});
