import React from 'react';
import Autocomplete from 'react-autocomplete';
import IngredientList from './IngredientList';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listIngredients: [],
      serchInput: '',
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
    this.setState({ serchInput: e.target.value });
  }

  /**
   * When user clicks on the add button, the ingredient input would be added into a list after passing validation.
   * @param {object} e - Event object.
   */
  addItem(e) {
    e.preventDefault();

    const { listIngredients, serchInput } = this.state;
    const upperedSerchInput = serchInput.trim().toUpperCase();

    // using loop because we need to turn keys into uppercase
    let isValid = false;
    let addedIngre = null;
    for (let ingre in this.props.validIngredients) {
      if (ingre.toUpperCase() === upperedSerchInput) {
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
      });
    } else {
      this.setState({ errMsg: `${serchInput} is not a valid ingredient :(` });
    }
  }

  /**
   * Remove the ingredient item from the IngredietnList component.
   * @param {string} item - The ingredient item that willbe removed from list.
   */
  removeItem(item) {
    // make a copy of array
    const ingredients = [...this.state.listIngredients];
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
    const { serchInput, listIngredients } = this.state;
    const { handleSearchSubmit, validIngredients } = this.props;
    const wrapperStyle = {
      display: 'inline-block',
      width: '88%',
      border: 'none',
      height: '40px',
      background: '#eee',
      lineHeight: '40px',
      paddingLeft: '10px',
      marginLeft: '5px',
      borderRadius: '50px',
      zIndex: '3',
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
            value={serchInput}
            onChange={this.inputHandler}
            onSelect={value => this.setState({ serchInput: value })}
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
