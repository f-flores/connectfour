import React, {Component} from 'react';
import axios from 'axios';

const API_URL = `test_url`;
const API_KEY = `test_url`;

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    }
  }

  componentDidMount() {
    axios.get(API_URL, { headers: { 'Ocp-Apim-Subscription-Key': API_KEY } })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        Product View
      </div>

    );
  }
}

export default ProductView;
