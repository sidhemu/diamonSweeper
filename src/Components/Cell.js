import React from "react";

const Cell = props => {
  let renderCell = () => {
    if (props.data.isOpen) {
      if (props.data.hasDiamond) {
        return (
          <div className="cell open">
            <div>♦</div>
          </div>
        );
      } else {
        return (
          <div className="cell open">
            <div>&nbsp;</div>
          </div>
        );
      }
    } else {
      return (
        <div
          className="cell"
          onClick={!props.finished ? () => props.open(props.data) : null}
        >
          <div> ? </div>
        </div>
      );
    }
  };
  return renderCell();
};

export default Cell;
