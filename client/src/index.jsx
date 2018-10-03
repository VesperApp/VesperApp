import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import user from '../../database/data/user';

import Header from './components/Header';
import Search from './components/Search';
import ResultsList from './components/ResultsList';
import IngredirentList from './components/IngredientList';
import FavoriteList from './components/FavoriteList';
import CocktailDetails from './components/CocktailDetails';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validIngredients: [],
      drinks: [],
      user: user,
      search: true,
      resultList: false,
      favComponent: false,
    };
    this.removeFavDrink = this.removeFavDrink.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.fetchValidIngredients();
  }

  /**
   * Show the search component.
   */
  showSearchComponent() {
    this.setState({
      search: !this.state.search,
    });
  }

  /**
   * Get the ingredients object(not array) used to validate user's search input.
   */
  fetchValidIngredients() {
    axios
      .get('/ingredients')
      .then(res => this.setState({ validIngredients: res.data }))
      .catch(err => console.log(err));
  }

  /**
   * When user click on search button, ingredients will be sent to server and return specific drinks.
   * Those drinks wiil be rendered on page.
   * @param {object} e - Event object.
   * @param {array} ingredients - Ingredients used to find specific drinks.
   */
  handleSearchSubmit(e, ingredients) {
    if (!ingredients.length) {
      return;
    }

    const postData = ingredients.reduce((obj, ingre) => {
      obj[ingre] = 1;
      return obj;
    }, {});

    axios
      .post('/drinksByIngredient', postData)
      .then(res => {
        this.setState({
          drinks: res.data,
          resultList: true,
        });
      })
      .catch(err => console.log(err));
  }

  /**
   * Close the popup component.
   * @param {string} popupName - the popup component which we intend to close(stop rendering).
   */
  handleClose(popupName) {
    if (popupName === ResultsList.name) {
      this.setState({ resultList: false });
    }
  }

  /**
   * Remove specific drink from user's favorite list. NOT FINISHED.
   * @param {object} e - Event object.
   * @param {object} drink - A drink object, which coresponding to the Drink document model in database/drink.js
   */
  removeFavDrink(e, drink) {
    e.stopPropagation();

    const { user } = this.state;
    // copy the array
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
        favDrinks: favDrinks,
      },
    });
  }

  render() {
    const { user, search, resultList, drinks, favComponent, validIngredients } = this.state;
    const SearchComponent = <Search handleSearchSubmit={this.handleSearchSubmit} validIngredients={validIngredients} />;
    return (
      <React.Fragment>
        <Header />
        {search ? SearchComponent : ''}
        {resultList ? <ResultsList drinks={drinks} onClose={this.handleClose} /> : null}
        {favComponent ? <FavoriteList onRemove={this.removeFavDrink} user={user} /> : null}
        <Footer />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
