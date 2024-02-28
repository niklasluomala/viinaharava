import React from 'react';

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

function PlayerBoard({
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
export default PlayerBoard;
