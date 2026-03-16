import React, { useState, useEffect, useCallback } from 'react';
import PlayerBoard from '../PlayerBoard/PlayerBoard';
import { Button } from '@/components/ui/button';
import { useGame } from '@/GameContext';

import { 
  GridCell, 
  getRandomMines, 
  createNewBoard, 
  getNewDeck, 
  determineCardsForGrid, 
  cardifyGrid 
} from '@/lib/game-logic';

function Game() {
  const gameContext = useGame();
  
  const { width, height, mines, playerSeed, setPlayerSeed } = gameContext;
  
  const [grid, setGrid] = useState<GridCell[][]>([[]]);
  const [localSeed, setLocalSeed] = useState<number>(playerSeed);
  
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
      
      determineCardsForGrid(
        board,
        deck,
        minesDeck,
        onesDeck,
        twosDeck,
        threesDeck,
        foursDeck,
        fivesDeck,
        sixesDeck,
        sevensDeck,
        eightsDeck,
        emptiesDeck
      );
      cardifyGrid(
        board,
        minesDeck,
        onesDeck,
        twosDeck,
        threesDeck,
        foursDeck,
        fivesDeck,
        sixesDeck,
        sevensDeck,
        eightsDeck,
        emptiesDeck
      );
      
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
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const seedStr = playerSeed?.toString() || '';
    const seedNum = parseInt(seedStr.substring(3)) || 0;
    
    const seededArray = getRandomMines(seedNum, width, height, mines);
    createNewGame(seededArray, width, height, mines, playerSeed);
  }, [playerSeed, width, height, mines, createNewGame]);
  
  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (setPlayerSeed) {
      setPlayerSeed(localSeed);
    } else {
      console.warn('setPlayerSeed is not defined in GameContext');
    }
    
    const seedStr = localSeed?.toString() || '';
    const seedNum = parseInt(seedStr.substring(3)) || 0;
    
    const seededArray = getRandomMines(seedNum, width, height, mines);
    createNewGame(seededArray, width, height, mines, localSeed);
  };
  
  return (
    <div className="game">
      <div className="seedEnter">
        <p>Pelin numero</p>
        <input
        onChange={(e) => {
          setLocalSeed(parseInt(e.target.value));
        }}
        />
        <br />
        <br />
        <Button onClick={handleSubmission}>Syötä koodi</Button>
      </div>
      <div className="seedDisplay">{playerSeed}</div>
        <br />
        <PlayerBoard
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

export default Game;
