import { useState } from 'react'
import Board from "../Board/Board.jsx";

import "./style.css";

function Game() {
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [mines, setMines] = useState(0)
    
    setHeight(6)
    setWidth(6)
    setMines(8)
    
    const restartGame = () => {
        this.boardElement.current.restartBoard();
    };
    
    return (
    <div className="game">
    <div className="control-buttons">
    <button onClick={restartGame()}>Generoi</button>
    </div>
        <br />
        <Board
        ref={this.boardElement}
        height={height}
        width={width}
        mines={mines}
        />
        </div>
    )
}
    
export default Game;