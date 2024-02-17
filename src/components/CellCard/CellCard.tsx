import * as React from "react";

import "./style.css";

interface Props {
    card: string
}

function CellCard({ card }: Props) {
    const className="cellcard"

    return (
        <div
          className={className}
        >
            <p>{card}</p>
        </div>
    )
}

export default CellCard;
