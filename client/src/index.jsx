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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validIngredients: [],
      drinks: [],
      user: user,
      search: true,
      resultList: false
    }
    this.removeFavDrink = this.removeFavDrink.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchValidIngredients();
    this.fetchDrinks();
  }

  showSearchComponent() {
    this.setState({
      search: !this.state.search
    });
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

  handleSearchSubmit(e, ingredients) {
    console.log(ingredients);
    const postData = ingredients.reduce((obj, ingre) => {
      obj[ingre] = 1;
      return obj;
    }, {});
    console.log(postData);
    axios.post('/drinksByIngredient', postData)
         .then((res) => console.log(res))
         .catch((err) => console.log(err));
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
    const {search, resultList, drinks} = this.state;
    const SearchComponent = (<Search
      handleSearchSubmit={this.handleSearchSubmit}
      validIngredients={this.state.validIngredients}/>);
    return (
      <div className="main">
        <Header/>
        {search ? SearchComponent : ''}
        {resultList ? <ResultsList drinks={drinks}/> : ''}
        <FavoriteList onRemove={this.removeFavDrink} user={this.state.user}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

