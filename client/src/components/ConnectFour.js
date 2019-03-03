import React, {Component} from 'react';
import Board from './Board';
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
      p1Name: "",
      p2Name: "",
    }
  }

  componentDidMount() {
    API
    .getActivePlayers()
    .then(res =>{
      console.log(res.data.activeList);
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

    // make api call to set player name
    console.log(this.state.p1Name);
  }

  render() {
    const {p1Name, p2Name, board} = this.state;

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
                Player 1
                <form className="form">
                  <input
                    value={p1Name}
                    name="p1Name"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="Player name"
                  />
                  <button onClick={this.handleFormSubmit}>Sign in</button>
                </form>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
              Player 2
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
