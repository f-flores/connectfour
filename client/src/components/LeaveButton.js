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
    this.handleClick = this.handleClick.bind(this);
  }

  // on pressing leave button
  handleClick = () => {
    const {player} = this.props;

    // make API call to leave game
    // takes in player number
    API
    .leavePlayer(player)
    .then(res => {
      // upon leaving
      // call get active players
      // and update dom
      console.log(res.data);
      this.props.leaveResult(player);
    })
    .catch(err => console.log(err))
  }





  render() {
    const {player} = this.props;
    return (
      <button
      player = {player}
      onClick = {this.handleClick}
      >
      Leave
      </button>
    );
  }
}

export default LeaveButton;
