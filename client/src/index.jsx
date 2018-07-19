import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Header from './components/Header.jsx';
import Search from './components/Search.jsx';
import ResultsList from './components/ResultsList.jsx';
import IngredirentList from './components/IngredientList.jsx';

import ingredients from '../../database/data/ingredients.js';

class App extends React.Component {
  render() {
    return (
      <div className="main">
        <Search listIngredients={ingredients}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// <Search/>
// <Footer/>
