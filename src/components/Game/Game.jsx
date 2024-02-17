import React from "react";
import Board from "../Board/Board.jsx";

import "./style.css";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.boardElement = React.createRef();

    this.state = {
      height: 6,
      width: 6,
      mines: 8,
      cards: [],
      minesCards: [],
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
  }

  handleChange = (prop, value) => {
    this.setState({ [prop]: value });
  };

  handleChangeHeight = event => {
    const val = clamp(event.target.value, 5, 18);
    this.handleChange("height", val);
  };

  handleChangeWidth = event => {
    const val = clamp(event.target.value, 5, 18);
    this.handleChange("width", val);
  };

  handleChangeMines = event => {
    const cap = Math.floor((this.state.height * this.state.width) / 3);
    const val = clamp(event.target.value, 1, cap);
    this.handleChange("mines", val);
  };

  restartGame = () => {
    this.boardElement.current.restartBoard();
  };

  render() {
    const { height, width, mines } = this.state;
    return (
      <div className="game">
        <div className="control-buttons">
          <button onClick={this.restartGame}>Generoi</button>
        </div>
        <br />
        <Board
          ref={this.boardElement}
          height={height}
          width={width}
          mines={mines}
        />
      </div>
    );
  }
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}

export default Game;