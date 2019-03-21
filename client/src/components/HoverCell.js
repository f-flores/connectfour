// =============================================
//
// File name: HoverCell.js
// Description: Actions to take place when
//  player hovers over a connect four board
//  cell.
//
// =============================================

import React, {Component} from 'react';

class HoverCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      example: "",
    }
  }

  handleMouseOver(row, col) {
    console.log(`hovering over row ${row}, column ${col}`);
  }

  render() {
    const {boardRow, boardCol} = this.props;
    console.log(`row ${boardRow}, column ${boardCol}`);

    return (
      <div
        onMouseOver={() => this.handleMouseOver(boardRow, boardCol)}
      >
        <span>hr: {boardRow}, hc: {boardCol}</span>
      </div>
    );
  }
}

export default HoverCell;
