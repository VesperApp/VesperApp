import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

import user from '../../database/data/user.js'

import Header from './components/Header.jsx';
import Search from './components/Search.jsx';
import ResultsList from './components/ResultsList.jsx';
import IngredirentList from './components/IngredientList.jsx';
import FavoriteList from './components/FavoriteList.jsx';



const ROUTE = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  SEARCH: 'SEARCH',
  FAVORITE: 'FAVORITE'
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: null,
      validIngredients: [],
      drinks: [],
      user: user
    }
    this.removeFavDrink = this.removeFavDrink.bind(this);
  }

  componentDidMount() {
    this.fetchValidIngredients();
    this.fetchDrinks();
  }

  fetchValidIngredients() {
    axios.get('/ingredients')
         .then((res) => this.setState({validIngredients: res.data}))
         .catch((err) => console.log(err));
  }

  fetchDrinks() {
    axios.get('/drinks')
         .then((res) => this.setState({drinks: res.data.slice(0, 3)}))
         .catch((err) => console.log(err));
  }

  route(path) {
    this.setState({route: path});
  }

  removeFavDrink(e, drink) {
    e.stopPropagation();

    // TODO: using axios to send delete POST first
    // axios.put('/user/id/drinks')...

    const {user} = this.state;
    //copy the array
    let favDrinks = [...user.favDrinks];
    for (let i = 0; i < favDrinks.length; i++) {
      if (favDrinks[i]._id === drink._id) {
        favDrinks.splice(i, 1);
        break;
      }
    }
    this.setState({
      user: {
        name: user.name,
        password: user.password,
        favDrinks: favDrinks
      }
    });
  }

  render() {
    return (
      <div className="main">
        <Header/>
        <Search onRoute={this.route.bind(this)} validIngredients={this.state.validIngredients}/>
        <ResultsList drinks={this.state.drinks}/>
        <FavoriteList onRemove={this.removeFavDrink} user={this.state.user}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

