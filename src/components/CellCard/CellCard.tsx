import * as React from "react";

import "./style.css";

interface Props {
    gridCell: GridCell
}

interface GridCell {
    x: number,
    y: number,
    card: string,
    n: number,
    isMine: boolean
}

function CellCard({ gridCell }: Props) {
    const className="cellcard"

    return (
        <div
          className={className}
        >
            <p>{gridCell.card}</p>
        </div>
    )
}

export default CellCard;
