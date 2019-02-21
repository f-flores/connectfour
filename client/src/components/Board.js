import React from 'react';
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

const Board = props => {
  const {playBoard} = props;

  return (
    <Table>
    {
      playBoard.map(function(row, index) {

        return (
          <TRow key={index}>
              {
                row.map(function(col, cIndex) {
                  return (
                      <TCell key={`{index}{cIndex}`}>Row: {index}, Col: {cIndex}</TCell>
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

export default Board;
