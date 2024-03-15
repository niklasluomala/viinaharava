import { createContext } from 'react';

const context = {
    seed: Math.floor(Math.random() * 1000000)
}

export const GameContext = createContext(context);