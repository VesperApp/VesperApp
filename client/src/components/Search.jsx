import React from 'react';

import IngredientList from './IngredientList.jsx';
import Autocomplete from 'react-autocomplete'

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listIngredients: [],
      serchInput: '',
      errMsg: '',
      //showListengredientComponent: false
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
    serchInput = serchInput.trim().toUpperCase();

    // using loop because we need to turn keys into uppercase
    let isValid = false;
    let addedIngre = null;
    for (let ingre in this.props.validIngredients) {
      if (ingre.toUpperCase() === serchInput) {
        isValid = true;
        addedIngre = ingre;
        break;
      }
    }

    if (isValid) {
      this.setState({
        listIngredients: [...listIngredients, addedIngre],
        serchInput: '',
        errMsg: '',
        showListengredientComponent: false
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

  matchStateToTermWithHeaders(state, value) {
    console.log(state);
    return value && (
      state.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  render() {
    const {serchInput, listIngredients} = this.state;
    const {handleSearchSubmit} = this.props;
    return (
      <div className="search">
        <form className="searchView">
          <div className="title">
            What drink ingredients do you have?
          </div>
          <input
            onChange={this.inputHandler}
            type='text'
            placeholder='rum'
            value={serchInput}
          />
          <Autocomplete
            getItemValue={(item) => item.label}
            items={[
              { label: 'apple' },
              { label: 'banana' },
              { label: 'pear' }
            ]}
            renderItem={(item, isHighlighted) =>
              <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.label}
              </div>
            }
            value={serchInput}
            onChange={this.inputHandler}
            onSelect={value => this.setState({ serchInput: value })}
            shouldItemRender={this.matchStateToTermWithHeaders}
          />
          <input onClick={this.addItem} type='submit' value = 'Add'/>
          <span>{this.state.errMsg}</span>
          </form>
          <IngredientList
            onSubmit={handleSearchSubmit}
            onRemove={this.removeItem}
            ingredients={listIngredients}
          />
      </div>
    )
  }
}

export default Search;