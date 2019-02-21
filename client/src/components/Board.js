import React from 'react';
import styled from 'styled-components'

const Table = styled.table`
  background-color: "#f8f5a3";
  color: "#000040";
  border: 2px solid black;
  border-collapse: collapse;
`;

const TRow = styled.tr`
  background-color: "#f8f5a3";
  border: 2px solid black;
`;

const TCell = styled.td`
  background-color: "#f8f5a3";
  border: 2px solid black;
`;

const Board = props => {
  const {playBoard} = props;

  return (
    <div>
      <div>
        <h3>Board</h3>
      </div>
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
    </div>
  );
}

/*
          return (
              <tr>
                  <td>{ub.firstName}</td>
                  <td>{ub.lastName}</td>
                  {buttons}
              </tr>
          )

body: arr.map( function( row ) {
    return row.map( function( cell ) {
        return foo( cell );
    } );
} )
*/

export default Board;
