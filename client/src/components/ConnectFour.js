import React, {Component} from 'react';
import Board from './Board';
import axios from 'axios';

const GRID_ROWS = 7;
const GRID_COLS = 7;

class ConnectFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      turn: 1,
      board: [...Array(GRID_ROWS)].fill(null).map(x=>Array(GRID_COLS).fill(null)),
    }
  }

  componentDidMount() {

  }

  render() {
    const {board} = this.state;

    return (
      <div>
        <header>
        Connect Four
        </header>
        <section>
          <Board
            playBoard={board}
          />
        </section>
      </div>

    );
  }
}

export default ConnectFour;
