import React from "react";
import PropTypes from "prop-types";
import Cell from "../Cell/Cell.jsx";
import CellCard from "../CellCard/CellCard.jsx";

import "./style.css";

class Board extends React.Component {
  state = this.getInitialState();

  getInitialState() {
    const initialState = {
      grid: this.createNewBoard(),
      minesCount: this.props.mines,
      cards: [],
      mines: [],
      ones: [],
      twos: [],
      threes: [],
      fours: [],
      fives: [],
      sixes: [],
      sevens: [],
      eights: [],
      empties: []
    };
    return initialState;
  }

  // Board utilities
  createNewBoard(click = null) {
    const grid = [];
    const rows = this.props.width;
    const columns = this.props.height;
    const minesCount = this.props.mines;
    const minesArray = this.getRandomMines(minesCount, columns, rows);

    for (let i = 0; i < columns; ++i) {
      grid.push([]);
      for (let j = 0; j < rows; ++j) {
        const gridCell = new GridCell(i, j, minesArray.includes(i * rows + j));
        this.addGridCell(grid, gridCell);
      }
    }

    return grid;
  }

  getRandomMines(amount, columns, rows) {
    const minesArray = [];
    const limit = columns * rows;
    const minesPool = [...Array(limit).keys()];

    for (let i = 0; i < amount; ++i) {
      const n = Math.floor(Math.random() * minesPool.length);
      minesArray.push(...minesPool.splice(n, 1));
    }

    return minesArray;
  }

  addGridCell(grid, gridCell) {
    const y = grid.length - 1;
    const x = grid[y].length;
    const lastGridCell = gridCell;
    const neighbours = this.getNeighbours(grid, y, x);

    for (let neighbourGridCell of neighbours) {
      if (lastGridCell.isMine) {
        neighbourGridCell.n += 1;
      } else if (neighbourGridCell.isMine) {
        lastGridCell.n += 1;
      }
    }

    grid[y].push(gridCell);
  }

  restartBoard() {
    this.setState(this.getInitialState());
  }

  /* Helpers */
  getNeighbours(grid, y, x) {
    const neighbours = [];
    const currentRow = grid[y];
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
  }

  // Rendering functions
  renderBoard() {
    const grid = this.state.grid;

    return grid.map(row => {
      const rowCells = row.map(gridCell => (
        <Cell
          key={gridCell.y * row.length + gridCell.x}
          value={gridCell}
        />
      ));

      return <div className="row">{rowCells}</div>;
    });
  }

  renderBoardCards() {
    const grid = this.state.grid;

    // spades, clubs, diamonds, hearts
    const suites = ["♠️", "♣️", "♦️", "♥️"]

    // card values from A to King
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

    // using 2 decks by default
    const decks = 2;

    let cards = this.state.cards

    for (let value of values) {
        for (let suite of suites) {
            for (let i = 0; i < decks; i++) {
                this.state.cards.push("".concat(value, suite))
            }
        }
    }

    if (this.state.mines.length === 0) {
        grid.map(row => {
            row.map(cell => {
                if (cell.isMine) {
                    this.state.mines.push(this.state.cards.splice(cards.findIndex(card => card.match(/[(9)(10)]/g)), 1));
                } else if (cell.n === 1) {
                    this.state.ones.push(this.state.cards.splice(cards.findIndex(card => card.match(/[AJ]/g)), 1))
                } else if (cell.n === 2) {
                    this.state.twos.push(this.state.cards.splice(cards.findIndex(card => card.match(/[2Q]/g)), 1))
                } else if (cell.n === 3) {
                    this.state.threes.push(this.state.cards.splice(cards.findIndex(card => card.match(/[3K]/g)), 1))
                } else if (cell.n === 4) {
                    this.state.fours.push(this.state.cards.splice(cards.findIndex(card => card.match(/[4]/g)), 1))
                } else if (cell.n === 5) {
                    this.state.fives.push(this.state.cards.splice(cards.findIndex(card => card.match(/[5]/g)), 1))
                } else if (cell.n === 6) {
                    this.state.sixes.push(this.state.cards.splice(cards.findIndex(card => card.match(/[6]/g)), 1))
                } else if (cell.n === 7) {
                    this.state.sevens.push(this.state.cards.splice(cards.findIndex(card => card.match(/[7]/g)), 1))
                } else if (cell.n === 8) {
                    this.state.eights.push(this.state.cards.splice(cards.findIndex(card => card.match(/[8]/g)), 1))
                } else if (cell.n === 0 && !cell.isMine) {
                    this.state.empties.push(this.state.cards.splice(cards.findIndex(card => card.match(/[7-8]/g)), 1))
                }
            })
        })
    }

    return grid.map(row => {
        const rowCells = row.map(gridCell => (
            <CellCard
              key={gridCell.y * row.length + gridCell.x}
              value={gridCell}
              card={this.getCardForCell(gridCell)}
            />
        ));

        return <div className="rowCard">{rowCells}</div>;
    });
  }

  renderCards(name, className, arr) {
    let cards = arr.map(card => (
        <span>{card} </span>
    ));
    if (cards.length == 0) return
    return (
      <div className={className}>
          <span>{name}</span>
          <br />
          {cards}
      </div>
     )
  }

  render() {
    return (
      <div className="board">
        <div className="grid">{this.renderBoard()}</div>
        <div className="grid">{this.renderBoardCards()}</div>
        <div className="ruleset">
            <div className="mines">{this.renderCards("Miinat", "mines", this.state.mines)}</div>
            <div className="ones">{this.renderCards("Ykköset:", "ones", this.state.ones)}</div>
            <div className="twos">{this.renderCards("Kakkoset:", "twos", this.state.twos)}</div>
            <div className="threes">{this.renderCards("Kolmoset:", "threes", this.state.threes)}</div>
            <div className="fours">{this.renderCards("Neloset:", "fours", this.state.fours)}</div>
            <div className="fives">{this.renderCards("Vitoset:", "fives", this.state.fives)}</div>
            <div className="sixes">{this.renderCards("Kutoset:", "sixes", this.state.sixes)}</div>
            <div className="sevens">{this.renderCards("Seiskat:", "sevens", this.state.sevens)}</div>
            <div className="eights">{this.renderCards("Kasit:", "eights", this.state.eights)}</div>
            <div className="empties">{this.renderCards("Tyhjät:", "empties", this.state.empties)}</div>
        </div>
      </div>
    );
  }

  getCardForCell(cell) {
    let card = ""
    if (cell.isMine) {
        card = this.state.mines.shift();
        this.state.mines.push(card);
    }
    else if (cell.n === 1) {
        card = this.state.ones.shift();
        this.state.ones.push(card);
    } else if (cell.n === 2) {
        card = this.state.twos.shift();
        this.state.twos.push(card);
    } else if (cell.n === 3) {
        card = this.state.threes.shift();
        this.state.threes.push(card);
    } else if (cell.n === 4) {
        card = this.state.fours.shift();
        this.state.fours.push(card);
    } else if (cell.n === 5) {
        card = this.state.fives.shift();
        this.state.fives.push(card);
    } else if (cell.n === 6) {
        card = this.state.sixes.shift();
        this.state.sixes.push(card);
    } else if (cell.n === 7) {
        card = this.state.sevens.shift();
        this.state.sevens.push(card);
    } else if (cell.n === 8) { 
        card = this.state.eights.shift();
        this.state.eights.push(card);
    } else if (cell.n === 0 && !cell.isMine) {
        // check if card is already used
        let cardIsUsed = false;
        do {
            cardIsUsed = false;
            card = this.state.empties.shift();
            if (this.state.ones.find(one => one == card)) {
                cardIsUsed = true;
            } else if (this.state.twos.find(two => two == card)) {
                cardIsUsed = true;
            } else if (this.state.threes.find(three => three == card)) {
                cardIsUsed = true;
            } else if (this.state.fours.find(four => four == card)) {
                cardIsUsed = true;
            } else if (this.state.fives.find(five => five == card)) {
                cardIsUsed = true;
            } else if (this.state.sixes.find(six => six == card)) {
                cardIsUsed = true;
            } else if (this.state.sevens.find(seven => seven == card)) {
                cardIsUsed = true;
            } else if (this.state.eights.find(eight => eight == card)) {
                cardIsUsed = true;
            }      
        } while (cardIsUsed)
        this.state.empties.push(card);
    }
    return card;
  }
}

class GridCell {
  constructor(y, x, isMine) {
    this.x = x;
    this.y = y;
    this.n = 0;
    this.isMine = isMine;
  }
  get isEmpty() {
    return this.n === 0 && !this.isMine;
  }
}

// Type checking With PropTypes
Board.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  mines: PropTypes.number
};

export default Board;