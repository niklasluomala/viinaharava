import * as React from "react";
import "./style.css";

interface Props {
    value: GridCell
}

interface GridCell {
    isMine: boolean,
    isEmpty: boolean,
    n: number
}

function Cell({ value }: Props) {
    const getValue = () => {
        if (value.isMine) {
            return "💣"
        } else if (value.isEmpty) {
            return ""
        }
        
        return value.n
    }
    
    const className = 
    "cell" +
    (value.isMine ? " is-mine" : "") +
    (value.isEmpty ? " is-empty" : "")

    return (
        <div className={ className }>
          { getValue() }
        </div>
        )
    }
    
    export default Cell;
    