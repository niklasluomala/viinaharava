import { createContext } from 'react';

const INITIAL_MINES = 6;
const INITIAL_HEIGHT = 6;
const INITIAL_WIDTH = 6;
const rand = parseInt(
  ''.concat(
    INITIAL_MINES.toString(),
    INITIAL_HEIGHT.toString(),
    INITIAL_WIDTH.toString(),
    Math.floor(Math.random() * 1000000).toString()
  )
);

const context = {
  mines: 6,
  height: 6,
  width: 6,
  dealerSeed: rand,
  playerSeed: rand,
};

export const GameContext = createContext(context);
