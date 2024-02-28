import * as React from 'react';
import './style.css';
import cn from 'classnames';

interface Props {
  value: GridCell;
}

interface GridCell {
  x: number;
  y: number;
  card?: string;
  n: number;
  isMine: boolean;
}

function Cell({ value }: Props) {
  const getValue = () => {
    if (value.isMine) {
      return '💣';
    }

    return value.n === 0 ? '' : value.n;
  };

  const className = cn('cell', {
    'is-mine': value.isMine,
  });

  return <div className={className}>{getValue()}</div>;
}

export default Cell;
