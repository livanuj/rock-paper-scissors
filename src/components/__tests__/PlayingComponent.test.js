import React from 'react';
import { render, screen } from '@testing-library/react';
import ScoreContextProvider from '../../context/ScoreContext';
import PlayingComponent from '../PlayingComponent';

test('renders Playing Component', () => {
  render(
    <ScoreContextProvider>
      <PlayingComponent />
    </ScoreContextProvider>
  );
  const divElement = screen.getByTestId("playing-component"); 
  expect(divElement).toHaveTextContent("Choose Wisely");
});
