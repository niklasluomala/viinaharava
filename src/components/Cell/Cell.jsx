import React from "react";
import PropTypes from "prop-types";

import "./style.css";

class Cell extends React.Component {
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
      "cell" +
      (this.props.value.isMine ? " is-mine" : "") +
      (this.props.value.isEmpty ? " is-empty" : "")

    return (
      <div
        className={className}
      >
        {this.getValue()}
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
  isEmpty: PropTypes.func
};

Cell.propTypes = {
  value: PropTypes.objectOf(PropTypes.shape(cellItemShape)),
};

export default Cell;
