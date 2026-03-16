import React, { useState, useEffect, useCallback } from 'react';
import Board from '../Board/Board';
import { Button } from '@/components/ui/button';
import { useGame } from '@/GameContext';
import { MinesSelector } from '@/components/mines-selector';
import './style.css';

import { 
  GridCell, 
  getRandomMines, 
  createNewBoard, 
  getNewDeck, 
  determineCardsForGrid, 
  cardifyGrid
} from '@/lib/game-logic';

export default function Game() {
  const gameContext = useGame();

  const { width, height, mines, dealerSeed, setDealerSeed, setPlayerSeed } = gameContext;
  
  const [grid, setGrid] = useState<GridCell[][]>([[]]);
  const [minesCards, setMinesCards] = useState<string[]>([]);
  const [ones, setOnes] = useState<string[]>([]);
  const [twos, setTwos] = useState<string[]>([]);
  const [threes, setThrees] = useState<string[]>([]);
  const [fours, setFours] = useState<string[]>([]);
  const [fives, setFives] = useState<string[]>([]);
  const [sixes, setSixes] = useState<string[]>([]);
  const [sevens, setSevens] = useState<string[]>([]);
  const [eights, setEights] = useState<string[]>([]);
  const [empties, setEmpties] = useState<string[]>([]);
  
  const createNewGame = useCallback(
    (seededArray: number[], gameWidth: number, gameHeight: number, gameMines: number, currentSeed: number) => {
      const board = createNewBoard(seededArray, currentSeed, gameWidth, gameHeight, gameMines);
      
      const deck = getNewDeck();
      const minesDeck: string[] = [];
      const onesDeck: string[] = [];
      const twosDeck: string[] = [];
      const threesDeck: string[] = [];
      const foursDeck: string[] = [];
      const fivesDeck: string[] = [];
      const sixesDeck: string[] = [];
      const sevensDeck: string[] = [];
      const eightsDeck: string[] = [];
      const emptiesDeck: string[] = [];

      determineCardsForGrid(board, deck, minesDeck, onesDeck, twosDeck, threesDeck, foursDeck, fivesDeck, sixesDeck, sevensDeck, eightsDeck, emptiesDeck);
      cardifyGrid(board, minesDeck, onesDeck, twosDeck, threesDeck, foursDeck, fivesDeck, sixesDeck, sevensDeck, eightsDeck, emptiesDeck);
      
      setGrid(board);
      setMinesCards(minesDeck);
      setOnes(onesDeck);
      setTwos(twosDeck);
      setThrees(threesDeck);
      setFours(foursDeck);
      setFives(fivesDeck);
      setSixes(sixesDeck);
      setSevens(sevensDeck);
      setEights(eightsDeck);
      setEmpties(emptiesDeck);
    },
    []
  );

  useEffect(() => {
    const seedStr = dealerSeed?.toString() || '';
    const seedNum = parseInt(seedStr.substring(3)) || 0;

    const seededArray = getRandomMines(seedNum, width, height, mines);
    createNewGame(seededArray, width, height, mines, seedNum);
  }, [dealerSeed, mines, width, height, createNewGame]);
    
  return (
    <div className="game">
      <div className="controls">
        <MinesSelector defaultValue={[mines]} />
      
        <Button
          onClick={() => {
            const rand = parseInt(
              ''.concat(
                mines.toString(),
                width.toString(),
                height.toString(),
                Math.floor(Math.random() * 1000000).toString()
              )
            );

            if (setDealerSeed) setDealerSeed(rand);
            if (setPlayerSeed) setPlayerSeed(rand);
          }}
        >
          Generoi
        </Button>
      </div>
      <br />
      <div className="seedDisplay">
        <p>Pelin numero</p>
        {dealerSeed}
      </div>
      <br />
      <Board
        grid={grid}
        minesCards={minesCards}
        ones={ones}
        twos={twos}
        threes={threes}
        fours={fours}
        fives={fives}
        sixes={sixes}
        sevens={sevens}
        eights={eights}
        empties={empties}
      />
    </div>
  );
}
  