import React from "react";

import "./style.css";

function Cell(props) {
    const getValue = () => {
        const { value } = props

        if (value.isMine) {
            return "💣"
        } else if (value.isEmpty) {
            return ""
        }

        return value.n
    }

    const className = 
      "cell" +
      (props.value.isMine ? " is-mine" : "") +
      (props.value.isEmpty ? " is-empty" : "")

    return (
        <div
          className={className}
        >
            {getValue()}
        </div>
    )
}

export default Cell;
