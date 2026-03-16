export interface GridCell {
    x: number;
    y: number;
    card?: string;
    n: number;
    isMine: boolean;
}

export const random = (localSeed: number) => {
  const x = Math.sin(localSeed) * 1000000;
  return x - Math.floor(x);
};

export const getRandomMines = (seed: number, width: number, height: number, minesCount: number) => {
  const minesArray: number[] = [];
  const limit = width * height;
  const minesPool = [...Array(limit).keys()];
  
  for (let i = 0; i < minesCount; ++i) {
    const n = random(seed++) * minesPool.length;
    minesArray.push(...minesPool.splice(n, 1));
  }
  
  return minesArray;
};

export const getNeighbours = (grid: [GridCell[]], y: number, x: number) => {
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

export const addGridCell = (grid: [GridCell[]], gridCell: GridCell) => {
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

export const createNewBoard = (
  seededArr: number[],
  seed: number,
  width: number,
  height: number,
  minesCount: number
) => {
  const board: [GridCell[]] = [[]];
  const minesArr = seededArr.length != 0 ? seededArr : getRandomMines(seed, width, height, minesCount);
  //setMinesArray(minesArr);
  
  for (let i = 0; i < width; ++i) {
    board.push([]);
    for (let j = 0; j < height; ++j) {
      const gridCell: GridCell = {
        y: i,
        x: j,
        isMine: minesArr.includes(i * height + j),
        n: 0,
      };
      //const gridCell = new GridCell(i, j, minesArray.includes(i * height + j), "")
      addGridCell(board, gridCell);
    }
  }
  
  return board;
};

export const getNewDeck = () => {
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

export const determineCardsForGrid = (
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

export const cardifyGrid = (
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