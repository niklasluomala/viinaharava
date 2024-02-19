import React from "react";
import PropTypes from "prop-types";
import Cell from "../Cell/Cell.tsx";
import CellCard from "../CellCard/CellCard.tsx";

import "./style.css";

class Board extends React.Component {
  // Rendering functions
  renderBoard() {
    const grid = this.props.grid

    return grid.map(row => {
      const rowCells = row.map(gridCell => (
        <Cell
          key={gridCell.y * row.length + gridCell.x}
          value={gridCell}
        />
      ));

      return <div className="row" key={row}>{rowCells}</div>;
    });
  }

  renderBoardCards() {
    return this.props.grid.map(row => {
        const rowCells = row.map(gridCell => (
            <CellCard
              key={gridCell.y * row.length + gridCell.x}
              gridCell={gridCell}
            />
        ));

        return <div className="rowCard" key={ row }>{rowCells}</div>;
    });
  }

  renderCards(name, className, arr) {
    let cards = arr.map(card => (
        <span key={ card }>{ card } </span>
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
            <div className="mines">{this.renderCards("Miinat", "mines", this.props.minesCards)}</div>
            <div className="ones">{this.renderCards("Ykköset:", "ones", this.props.ones)}</div>
            <div className="twos">{this.renderCards("Kakkoset:", "twos", this.props.twos)}</div>
            <div className="threes">{this.renderCards("Kolmoset:", "threes", this.props.threes)}</div>
            <div className="fours">{this.renderCards("Neloset:", "fours", this.props.fours)}</div>
            <div className="fives">{this.renderCards("Vitoset:", "fives", this.props.fives)}</div>
            <div className="sixes">{this.renderCards("Kutoset:", "sixes", this.props.sixes)}</div>
            <div className="sevens">{this.renderCards("Seiskat:", "sevens", this.props.sevens)}</div>
            <div className="eights">{this.renderCards("Kasit:", "eights", this.props.eights)}</div>
            <div className="empties">{this.renderCards("Tyhjät:", "empties", this.props.empties)}</div>
        </div>
      </div>
    );
  }
}

// Type checking With PropTypes
Board.propTypes = {
  grid: PropTypes.array, 
  cards: PropTypes.array,
  minesCards: PropTypes.array,
  ones: PropTypes.array,
  twos: PropTypes.array,
  threes: PropTypes.array,
  fours: PropTypes.array,
  fives: PropTypes.array,
  sixes: PropTypes.array,
  sevens: PropTypes.array,
  eights: PropTypes.array,
  empties: PropTypes.array
};

export default Board;