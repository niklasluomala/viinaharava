import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface GameContextType {
  mines: number;
  height: number;
  width: number;
  dealerSeed: number;
  playerSeed: number;
  setPlayerSeed: (seed: number) => void;
  setDealerSeed: (seed: number) => void;
  setMines: (mines: number) => void;
  setHeight: (height: number) => void;
  setWidth: (width: number) => void;
}

const INITIAL_MINES = 6;
const INITIAL_HEIGHT = 6;
const INITIAL_WIDTH = 6;
const initialRand = parseInt(
  ''.concat(
    INITIAL_MINES.toString(),
    INITIAL_HEIGHT.toString(),
    INITIAL_WIDTH.toString(),
    Math.floor(Math.random() * 1000000).toString()
  )
);

export const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [mines, setMines] = useState(INITIAL_MINES);
  const [height, setHeight] = useState(INITIAL_HEIGHT);
  const [width, setWidth] = useState(INITIAL_WIDTH);
  const [dealerSeed, setDealerSeed] = useState(initialRand);
  const [playerSeed, setPlayerSeed] = useState(initialRand);
  
  const value: GameContextType = {
    mines,
    height,
    width,
    dealerSeed,
    playerSeed,
    setPlayerSeed,
    setDealerSeed,
    setMines,
    setHeight,
    setWidth,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
};

/* eslint-disable react-refresh/only-export-components */
export const useGame = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
  
  