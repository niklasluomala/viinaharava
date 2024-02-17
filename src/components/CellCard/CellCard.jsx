import React from "react";
import PropTypes from "prop-types";

import "./style.css";

class CellCard extends React.Component {
  getValue() {
    const { value } = this.props;

    if (value.isMine) {
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
  isMine: PropTypes.bool,
};

CellCard.propTypes = {
  value: PropTypes.objectOf(PropTypes.shape(cellItemShape)),
  card: PropTypes.array
};

export default CellCard;
