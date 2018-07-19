import React from 'react';

import IngredientList from './IngredientList.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listIngredients: [],
      serchInput: '',
      errMsg: ''
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  inputHandler(e) {
    this.setState({serchInput: e.target.value});
  }

  addItem(e) {
    e.preventDefault();

    let {listIngredients, serchInput} = this.state;
    serchInput = serchInput.trim();

    const isValid = this.props.validIngredients[serchInput];
    if (isValid) {
      this.setState({
        listIngredients: [...listIngredients, serchInput],
        serchInput: '',
        errMsg: ''
      });
    } else {
      this.setState({errMsg: `${serchInput} is not a valid ingredient :(`});
    }
  }

  removeItem(item) {
    // make a copy of array
    const ingredients = [...this.state.listIngredients];
    const index = ingredients.indexOf(item);
    ingredients.splice(index, 1);
    this.setState({
      listIngredients: ingredients
    });
  }

  render() {
    const {serchInput} = this.state;
    return (
      <div className="search">
        <form className="searchView">
          <div className="title">
            What ingredients do you have?
          </div>
          <input
            onChange={this.inputHandler}
            type='text'
            placeholder='rum'
            value={this.state.serchInput}
          />
          <input onClick={this.addItem} type='submit' value = 'Add'/>
          <span>{this.state.errMsg}</span>
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