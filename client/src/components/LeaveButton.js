// ===================================================
//
// File name: LeaveButton.js
// Description: Implements 'leave game' button.
//
// Date: March, 2019
//
// ===================================================

import React, {Component} from 'react';
import API from '../utilities/API';


class LeaveButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      example: "",
    };
  }

  render() {
    const {player} = this.props;
    return (
      <button
      player = {player}
      >
      Leave
      </button>
    );
  }
}

export default LeaveButton;
