import React from "react";
import PropTypes from "prop-types";

import "./style.css";

class CellCard extends React.Component {
  getValue() {
    const { value } = this.props;

    console.log(value)

    if (!value.isRevealed) {
      return this.props.value.isFlagged ? "🚩" : null;
    } else if (value.isMine) {
      return "💣";
    } else if (value.isEmpty) {
      return "";
    }

    return value.n;
  }

  render() {
    const className =
      "cellcard"

    return (
      <div
        className={className}
        onClick={this.props.onClick}
        onContextMenu={this.props.cMenu}
        card={this.props.card}
      >
        <p>{this.props.card}</p>
      </div>
    );
  }
}

// Type checking With PropTypes
const cellItemShape = {
  x: PropTypes.number,
  y: PropTypes.number,
  n: PropTypes.number,
  isRevealed: PropTypes.bool,
  isMine: PropTypes.bool,
  isFlagged: PropTypes.bool
};

CellCard.propTypes = {
  value: PropTypes.objectOf(PropTypes.shape(cellItemShape)),
  onClick: PropTypes.func,
  cMenu: PropTypes.func,
  card: PropTypes.string
};

export default CellCard;
