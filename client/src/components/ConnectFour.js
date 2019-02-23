import React, {Component} from 'react';
import Board from './Board';
// import axios from 'axios';
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
      turn: 1,
      board: [...Array(GRID_ROWS)].fill(null).map(x=>Array(GRID_COLS).fill(null)),
    }
  }

  componentDidMount() {

  }

  render() {
    const {board} = this.state;

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
          <Col xs={12} sm={{ span: 8, offset: 2 }}>
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
