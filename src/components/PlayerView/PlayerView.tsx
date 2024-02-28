import { useState, useEffect } from 'react';
import PlayerBoard from '../PlayerBoard/PlayerBoard';
import { Button } from '@/components/ui/button';

import React from 'react';

interface GridCell {
  x: number;
  y: number;
  card?: string;
  n: number;
  isMine: boolean;
}

function Game() {
  const [WIDTH, HEIGHT] = [6, 6];
  const NUM_MINES = 6;
  const [grid, setGrid] = useState<GridCell[][]>([[]]);
  const [minesArray, setMinesArray] = useState<number[]>([]);
  const [seed, setSeed] = useState<string>('');
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

  const createNewBoard = (seededArr: number[]) => {
    const board: [GridCell[]] = [[]];
    const minesArr = seededArr.length != 0 ? seededArr : getRandomMines();
    setMinesArray(minesArr);

    for (let i = 0; i < WIDTH; ++i) {
      board.push([]);
      for (let j = 0; j < HEIGHT; ++j) {
        const gridCell: GridCell = {
          y: i,
          x: j,
          isMine: minesArr.includes(i * HEIGHT + j),
          n: 0,
        };
        //const gridCell = new GridCell(i, j, minesArray.includes(i * height + j), "")
        addGridCell(board, gridCell);
      }
    }

    return board;
  };

  const cardifyGrid = (
    board: [GridCell[]],
    minesCards: string[],
    ones: string[],
    twos: string[],
    threes: string[],
    fours: string[],
    fives: string[],
    sixes: string[],
    sevens: string[],
    eights: string[],
    empties: string[]
  ) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const card = getCardForCell(
          board[i][j],
          minesCards,
          ones,
          twos,
          threes,
          fours,
          fives,
          sixes,
          sevens,
          eights,
          empties
        );
        board[i][j].card = card;
      }
    }
  };

  const getNewDeck = () => {
    // spades, clubs, diamonds, hearts
    const suites = ['♠️', '♣️', '♦️', '♥️'];

    // card values from A to King
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    // using 2 decks by default
    const decks = 2;

    const deck: string[] = [];

    for (const value of values) {
      for (const suite of suites) {
        for (let i = 0; i < decks; i++) {
          deck.push(''.concat(value, suite));
        }
      }
    }

    return deck;
  };

  const determineCardsForGrid = (
    board: [GridCell[]],
    cards: string[],
    minesCards: string[],
    ones: string[],
    twos: string[],
    threes: string[],
    fours: string[],
    fives: string[],
    sixes: string[],
    sevens: string[],
    eights: string[],
    empties: string[]
  ) => {
    board.map((row) => {
      row.map((cell) => {
        if (cell.isMine) {
          minesCards.push(
            ...cards.splice(
              cards.findIndex((card) => card.match(/[(9)(10)]/g)),
              1
            )
          );
        } else if (cell.n === 1) {
          ones.push(
            ...cards.splice(
              cards.findIndex((card) => card.match(/[AJ]/g)),
              1
            )
          );
        } else if (cell.n === 2) {
          twos.push(
            ...cards.splice(
              cards.findIndex((card) => card.match(/[2Q]/g)),
              1
            )
          );
        } else if (cell.n === 3) {
          threes.push(
            ...cards.splice(
              cards.findIndex((card) => card.match(/[3K]/g)),
              1
            )
          );
        } else if (cell.n === 4) {
          fours.push(
            ...cards.splice(
              cards.findIndex((card) => card.match(/[4]/g)),
              1
            )
          );
        } else if (cell.n === 5) {
          fives.push(
            ...cards.splice(
              cards.findIndex((card) => card.match(/[5]/g)),
              1
            )
          );
        } else if (cell.n === 6) {
          sixes.push(
            ...cards.splice(
              cards.findIndex((card) => card.match(/[6]/g)),
              1
            )
          );
        } else if (cell.n === 7) {
          sevens.push(
            ...cards.splice(
              cards.findIndex((card) => card.match(/[7]/g)),
              1
            )
          );
        } else if (cell.n === 8) {
          eights.push(
            ...cards.splice(
              cards.findIndex((card) => card.match(/[8]/g)),
              1
            )
          );
        } else if (cell.n === 0 && !cell.isMine) {
          empties.push(
            ...cards.splice(
              cards.findIndex((card) => card.match(/[7-8]/g)),
              1
            )
          );
        }
      });
    });
  };

  const getRandomMines = () => {
    const minesArray: number[] = [];
    const limit = WIDTH * HEIGHT;
    const minesPool = [...Array(limit).keys()];

    for (let i = 0; i < NUM_MINES; ++i) {
      const n = Math.floor(Math.random() * minesPool.length);
      minesArray.push(...minesPool.splice(n, 1));
    }

    return minesArray;
  };

  const addGridCell = (grid: [GridCell[]], gridCell: GridCell) => {
    const y = grid.length - 1;
    const x = grid[y].length;
    const lastGridCell = gridCell;
    const neighbours: GridCell[] = getNeighbours(grid, y, x);

    for (let i = 0; i < neighbours.length; i++) {
      if (lastGridCell.isMine) neighbours[i].n += 1;
      else if (neighbours[i].isMine) lastGridCell.n += 1;
    }
    grid[y].push(gridCell);
  };

  const getNeighbours = (grid: [GridCell[]], y: number, x: number) => {
    const neighbours: GridCell[] = [];
    const currentRow: GridCell[] = grid[y];
    const prevRow = grid[y - 1];
    const nextRow = grid[y + 1];

    if (currentRow[x - 1]) neighbours.push(currentRow[x - 1]);
    if (currentRow[x + 1]) neighbours.push(currentRow[x + 1]);
    if (prevRow) {
      if (prevRow[x - 1]) neighbours.push(prevRow[x - 1]);
      if (prevRow[x]) neighbours.push(prevRow[x]);
      if (prevRow[x + 1]) neighbours.push(prevRow[x + 1]);
    }
    if (nextRow) {
      if (nextRow[x - 1]) neighbours.push(nextRow[x - 1]);
      if (nextRow[x]) neighbours.push(nextRow[x]);
      if (nextRow[x + 1]) neighbours.push(nextRow[x + 1]);
    }

    return neighbours;
  };

  const getCardForCell = (
    cell,
    minesCards,
    ones,
    twos,
    threes,
    fours,
    fives,
    sixes,
    sevens,
    eights,
    empties
  ) => {
    let card = '';
    if (cell.isMine) {
      card = minesCards.shift();
      minesCards.push(card);
    } else if (cell.n === 1) {
      card = ones.shift();
      ones.push(card);
    } else if (cell.n === 2) {
      card = twos.shift();
      twos.push(card);
    } else if (cell.n === 3) {
      card = threes.shift();
      threes.push(card);
    } else if (cell.n === 4) {
      card = fours.shift();
      fours.push(card);
    } else if (cell.n === 5) {
      card = fives.shift();
      fives.push(card);
    } else if (cell.n === 6) {
      card = sixes.shift();
      sixes.push(card);
    } else if (cell.n === 7) {
      card = sevens.shift();
      sevens.push(card);
    } else if (cell.n === 8) {
      card = eights.shift();
      eights.push(card);
    } else if (cell.n === 0 && !cell.isMine) {
      // check if card is already used
      let cardIsUsed = false;
      do {
        cardIsUsed = false;
        card = empties.shift();
        if (ones.find((one) => one == card)) {
          cardIsUsed = true;
        } else if (twos.find((two) => two == card)) {
          cardIsUsed = true;
        } else if (threes.find((three) => three == card)) {
          cardIsUsed = true;
        } else if (fours.find((four) => four == card)) {
          cardIsUsed = true;
        } else if (fives.find((five) => five == card)) {
          cardIsUsed = true;
        } else if (sixes.find((six) => six == card)) {
          cardIsUsed = true;
        } else if (sevens.find((seven) => seven == card)) {
          cardIsUsed = true;
        } else if (eights.find((eight) => eight == card)) {
          cardIsUsed = true;
        }
      } while (cardIsUsed);
      empties.push(card);
    }
    return card;
  };

  const createNewGame = (seededArray: number[]) => {
    const board = seededArray.length != 0 ? createNewBoard(seededArray) : createNewBoard([]);
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
  };

  useEffect(() => {}, []);

  const handleSubmission = (e: React.FormEvent) => {
    if (e) e.preventDefault();
    const seedArray = seed.split(' ').map((n) => parseInt(n, 36));
    setMinesArray(seedArray);
    createNewGame(seedArray);
  };

  return (
    <div className="game">
      <div className="seedEnter">
          <input
            onChange={(e) => {
              setSeed(e.target.value);
            }}
          />
          <br />
          <br />
          <Button onClick={handleSubmission}>Syötä koodi</Button>
      </div>
      <div className="seedDisplay">
        {minesArray
          .map((n) => n.toString(36))
          .join(' ')
          .toUpperCase()}
      </div>
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
