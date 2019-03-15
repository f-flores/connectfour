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

  // on pressing leave button

  // make API call to leave game
  // takes in player number

  // upon leaving
  // call get active players
  // and update dom

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
