import React from 'react';
import Autocomplete from 'react-autocomplete';
import IngredientList from './SearchIngredientList';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listIngredients: [],
      searchInput: '',
      errMsg: '',
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  /**
   * User type someting in the search bar.
   * @param {object} e - Event object.
   */
  inputHandler(e) {
    this.setState({ searchInput: e.target.value });
  }

  /**
   * When user clicks on the add button, the ingredient input would be added into a list after passing validation.
   * @param {object} e - Event object.
   */
  addItem(e) {
    e.preventDefault();

    const { listIngredients, searchInput } = this.state;
    const { validIngredients } = this.props;
    const upperedSerchInput = searchInput.trim().toUpperCase();
    console.log('VALIIIID', validIngredients);
    // using loop because we need to turn keys into uppercase
    let isValid = false;
    let addedIngre = null;

    // const ingredientsArr = Object.keys(validIngredients);

    // for (let i = 0; i < ingredientsArr.length; i++) {
    //   if (ingredientsArr[i].toUpperCase() === upperedSerchInput) {
    //     isValid = true;
    //     addedIngre = ingredientsArr[i];
    //     break;
    //   }
    // }

    for (let IngredientName in validIngredients) {
      if (IngredientName.toUpperCase() === upperedSerchInput) {
        isValid = true;
        addedIngre = [IngredientName, validIngredients[IngredientName]];
        break;
      }
    }

    if (isValid) {
      this.setState({
        listIngredients: [...listIngredients, addedIngre],
        searchInput: '',
        errMsg: '',
      });
    } else {
      this.setState({ errMsg: `${searchInput} is not a valid ingredient :(` });
    }
  }

  /**
   * Remove the ingredient item from the IngredietnList component.
   * @param {string} item - The ingredient item that willbe removed from list.
   */
  removeItem(item) {
    // make a copy of array
    console.log('REMOVE ', item);
    const { listIngredients } = this.state;
    const ingredients = [...listIngredients];
    console.log('REMOVE ', ingredients);
    const index = ingredients.indexOf(item);
    ingredients.splice(index, 1);
    this.setState({
      listIngredients: ingredients,
    });
  }

  /**
   * The validation of dropdown list. If true, items will be shown in dropdownList; otherwise won't.
   * @param {object} item - Item in the dropdownList
   * @param {object} value - Input value of search bar.
   */
  matchStateToTerm(item, value) {
    return value && item.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  }

  /**
   * Convert object of ingredients into an array.
   * @param {object} ingredientsObj - Object with ingredients as properties keys.
   */
  convertIntoArray(ingredientsObj) {
    const arr = [];
    for (let key in ingredientsObj) {
      let ingre = { label: key };
      arr.push(ingre);
    }
    return arr;
    // return Object.keys(ingredientsObj);
  }

  render() {
    const { searchInput, listIngredients } = this.state;
    const { handleSearchSubmit, validIngredients } = this.props;
    const wrapperStyle = {
      display: 'inline-block',
      width: 'fit-content',
      border: 'none',
      height: '40px',
      background: '#eee',
      lineHeight: '40px',
      borderRadius: '6px',
    };
    return (
      <div className="search">
        <form className="searchView">
          <div className="title">What drink ingredients do you have?</div>
          <Autocomplete
            inputProps={{ className: 'searchInput' }}
            wrapperStyle={wrapperStyle}
            getItemValue={item => item.label}
            items={this.convertIntoArray(validIngredients)}
            renderItem={(item, isHighlighted) => (
              <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>{item.label}</div>
            )}
            value={searchInput}
            onChange={this.inputHandler}
            onSelect={value => this.setState({ searchInput: value })}
            shouldItemRender={this.matchStateToTerm}
          />
          <input onClick={this.addItem} type="submit" value="Add" />
          <span>{this.state.errMsg}</span>
        </form>
        <IngredientList onSubmit={handleSearchSubmit} onRemove={this.removeItem} ingredients={listIngredients} />
      </div>
    );
  }
}

export default Search;
