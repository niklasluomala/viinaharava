import React from 'react';
import Cell from '../Cell/Cell';
import CellCard from '../CellCard/CellCard';

import './style.css';

interface Props {
  grid: GridCell[][];
  minesCards: string[];
  ones: string[];
  twos: string[];
  threes: string[];
  fours: string[];
  fives: string[];
  sixes: string[];
  sevens: string[];
  eights: string[];
  empties: string[];
}

interface GridCell {
  x: number;
  y: number;
  card?: string;
  n: number;
  isMine: boolean;
}

function Board({
  grid,
  minesCards,
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  sevens,
  eights,
  empties,
}: Props) {
  const renderBoard = () => {
    return grid.map((row) => {
      const rowCells = row.map((gridCell) => (
        <Cell key={gridCell.y * row.length + gridCell.x} value={gridCell} />
      ));
      return (
        <div className="row" key={''}>
          {rowCells}
        </div>
      );
    });
  };

  const renderBoardCards = () => {
    return grid.map((row) => {
      const rowCells = row.map((gridCell) => (
        <CellCard key={gridCell.y * row.length + gridCell.x} gridCell={gridCell} />
      ));

      return (
        <div className="rowCard" key={''}>
          {rowCells}
        </div>
      );
    });
  };

  const renderCards = (name, className, arr) => {
    const cards = arr.map((card) => <span key={card}>{card} </span>);
    if (cards.length == 0) return;
    return (
      <div className={className}>
        <span>{name}</span>
        <br />
        {cards}
      </div>
    );
  };

  return (
    <div className="board">
      <div className="grid">{renderBoard()}</div>
      <div className="grid">{renderBoardCards()}</div>
      <div className="ruleset">
        <div className="mines">{renderCards('Miinat:', 'mines', minesCards)}</div>
        <div className="ones">{renderCards('Ykköset:', 'ones', ones)}</div>
        <div className="twos">{renderCards('Kakkoset:', 'twos', twos)}</div>
        <div className="threes">{renderCards('Kolmoset:', 'threes', threes)}</div>
        <div className="fours">{renderCards('Neloset:', 'fours', fours)}</div>
        <div className="fives">{renderCards('Vitoset:', 'fives', fives)}</div>
        <div className="sixes">{renderCards('Kutoset:', 'sixes', sixes)}</div>
        <div className="sevens">{renderCards('Seiskat:', 'sevens', sevens)}</div>
        <div className="eights">{renderCards('Kasit:', 'eights', eights)}</div>
        <div className="empties">{renderCards('Tyhjät:', 'empties', empties)}</div>
      </div>
    </div>
  );
}
export default Board;
