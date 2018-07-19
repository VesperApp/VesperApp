import React from 'react';

import IngredientList from './IngredientList.jsx';

class Search extends React.Component {
  render () {
    return (
      <div className="search">
        <form className="searchView">
          <div className="title">
            What ingredients do you have?
          </div>
          <input type='text' placeholder='rum' />
          <input type='submit' value = 'Add'/>
        </form>
        <IngredientList />
      </div>
    )
  }
}

export default Search