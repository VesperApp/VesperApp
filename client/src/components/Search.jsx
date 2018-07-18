import React from 'react';

import IngredientList from './IngredientList.jsx';

class Search extends React.Component {
  render () {
    return (
      <div className="search">
      <h2>What ingredients do you have?</h2>
      <form>
        <input type='text' placeholder='rum' />
        <input type='submit' value = 'add'/>
      </form>
      <IngredientList />
      </div>
    )
  }
}

export default Search