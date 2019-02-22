import React, {Component} from 'react';
import HoverCell from './HoverCell';
import styled from 'styled-components'

const Table = styled.table`
  background-color: "#f8f5a3";
  color: "#000040";
  border-left: 2px solid black;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  border-collapse: collapse;
`;

const TRow = styled.tr`
  background-color: "#f8f5a3";
`;

const TCell = styled.td`
  background-color: "#f8f5a3";
  border-right: 2px solid black;
  border-left: 2px solid black;
  padding: 5px;
`;

class Board extends Component {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  handleMouseOver(event, row) {
    event.preventDefault();
    console.log(`hovering over row ${row}`);
  }

  render() {
    const {playBoard} = this.props;

    return (
      <Table>
      {
        playBoard.map(function(row, rIdx) {

          return (
            <TRow key={rIdx}>
                {
                  row.map(function(col, cIdx) {
                    return (
                        <TCell key={`{rIdx}{cIdx}`} >
                          Row: {rIdx}, Col: {cIdx}
                          <HoverCell
                            board={playBoard}
                            boardRow={rIdx}
                            boardCol={cIdx}
                          />
                        </TCell>
                    )
                  })
                }
            </TRow>
          );

        })
      }
      </Table>
    );
  }
}

export default Board;
