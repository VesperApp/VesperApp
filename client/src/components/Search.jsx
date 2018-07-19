import React from 'react';

import IngredientList from './IngredientList.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listIngredients: [],
      serchInput: null,
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.search = this.search.bind(this);
  }

  inputHandler(e) {
    this.setState({serchInput: e.target.value});
  }

  search(e) {
    const {listIngredients, serchInput} = this.state;
    this.setState({
      listIngredients: [...listIngredients, serchInput]
    });
    e.preventDefault();
  }

  removeItem(item) {
    // make a copy of array
    console.log(item);
    let ingredients = [...this.state.listIngredients];
    const index = ingredients.indexOf(item);
    ingredients.splice(index, 1);
    this.setState({
      listIngredients: ingredients
    });
  }

  render() {
    const errMsg = `${this.state.serchInput} is not a valid ingredient :(`;

    return (
      <div className="search">
        <form className="searchView">
          <div className="title">
            What ingredients do you have?
          </div>
          <input onChange={this.inputHandler} type='text' placeholder='rum' />
          <input onClick={this.search} type='submit' value = 'Add'/>
          <span>{this.isNotFound ? errMsg : ''}</span>
        </form>
        <IngredientList
          onRemove={this.removeItem}
          ingredients={this.state.listIngredients}
        />
      </div>
    )
  }
}

export default Search;