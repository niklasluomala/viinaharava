import { createContext } from 'react';

const rand = Math.floor(Math.random() * 1000000);

const context = {
    dealerSeed: rand,
    playerSeed: rand
}

export const GameContext = createContext(context);