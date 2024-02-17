import React from "react";

import "./style.css";

function CellCard(props) {
    const className="cellcard"

    return (
        <div
          className={className}
        >
            <p>{props.card}</p>
        </div>
    )
}

export default CellCard;
