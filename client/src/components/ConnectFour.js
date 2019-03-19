// =====================================================================
//
// File name: ConnectFour.js
// Description: Handles sign in to game. Renders game board.
//
// Date: March, 2019
//
// ======================================================================

import React, {Component} from 'react';
import Board from './Board';
import LeaveButton from './LeaveButton';
import API from './../utilities/API';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const GRID_ROWS = 7;
const GRID_COLS = 7;

const Header = styled.header`
  background-color: #fbea8c;
  padding: 5px 0;
`;

const CustomH1 = styled.h1`
  text-align: center;
`;

class ConnectFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      turn: 0,
      board: [...Array(GRID_ROWS)].fill(null).map(x=>Array(GRID_COLS).fill(null)),
      pName: "",
      activePlyrList: [],
      playerData: null,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.displaySigninForm = this.displaySigninForm.bind(this);
    this.displayWaitMsgs = this.displayWaitMsgs.bind(this);
    this.getActivePlayerList = this.getActivePlayerList.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  componentDidMount = () => {
    this.getActivePlayerList();
  }

  getActivePlayerList = () => {
    API
    .getActivePlayers()
    .then(res =>{
      this.setState({
        activePlyrList: res.data.activeList,
        playerData: res.data.playerData,
      });
    })
    .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value,
    })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const {pName, activePlyrList} = this.state;
    const nextAvailablePlayerNum = !activePlyrList.includes(0) ? 0 : 1;

    const obj = {
      playerName: pName,
      playerNum: nextAvailablePlayerNum,
    }

    // make api call to set player name
    API
    .signinPlayer(obj)
    .then(res => {
      this.getActivePlayerList();
    })
    .catch(err => console.log(err));
    console.log(this.state.pName);
  }

  handleLeave = player => {
    console.log(`in handleLeave() `);
    console.log(`player ${player} left game`);
    this.getActivePlayerList();
  }

  displaySigninForm = () => {
    const {pName} = this.state;

    return (
      <div>
        Enter player name
        <form className="form">
          <input
            value={pName}
            name="pName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Player name"
          />
          <button onClick={this.handleFormSubmit}>Sign in</button>
        </form>
      </div>
    );
  }

  displayWaitMsgs = () => {
    const {activePlyrList, playerData} = this.state;
    const player1 = activePlyrList.includes(0);
    const player2 = activePlyrList.includes(1);

    if (player1 && player2) {
      return (
        <div>
          <div>
            Player 1: {playerData[0].playerName}
            <LeaveButton
              leaveResult = {this.handleLeave}
              player={0}
            />
          </div>
          <div>
            Player 2: {playerData[1].playerName}
            <LeaveButton
              leaveResult = {this.handleLeave}
              player={1}
            />
          </div>
        </div>
      );
    } else if (player2 && !player1) {
      return (
        <div>
          <div>
            Waiting for player 1 to sign in
          </div>
          <div>
            Player 2: {playerData[0].playerName}
            <LeaveButton
              leaveResult = {this.handleLeave}
              player={0}
            />
          </div>
        </div>
      );
    } else if (player1 && !player2) {
        return (
          <div>
            <div>
              Player 1: {playerData[0].playerName}
              <LeaveButton
                leaveResult = {this.handleLeave}
                player={0}
              />
            </div>
            <div>
              Waiting for player 2 to sign in
            </div>
          </div>
        );
    } else {
      return (
        <div>
          <div>
            Waiting for player 1 to sign in
          </div>
          <div>
            Waiting for player 2 to sign in
          </div>
        </div>
      );
    }
  }

  render() {
    const {activePlyrList, board} = this.state;

    return (
      <Container className="justify-content-center">
        <Row className="my-5">
          <Col xs={12} sm={{ span: 8, offset: 2 }}>
            <Header>
              <CustomH1>Connect Four</CustomH1>
            </Header>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={2}>
            <Row>
              <Col xs={12}>
                {
                  activePlyrList.length <= 1
                  ? this.displaySigninForm()
                  : ""
                }
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                { this.displayWaitMsgs() }
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={8}>
            <Board
              playBoard={board}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ConnectFour;
