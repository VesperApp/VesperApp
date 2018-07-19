import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

import Header from './components/Header.jsx';
import Search from './components/Search.jsx';
import ResultsList from './components/ResultsList.jsx';
import IngredirentList from './components/IngredientList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validIngredients: []
    }
  }

  componentDidMount() {
    axios.get('/ingredients')
         .then((res) => this.setState({validIngredients: res.data[0]}))
         .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="main">
        <Search validIngredients={this.state.validIngredients}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// <Search/>
// <Footer/>
