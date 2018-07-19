import React from 'react';

import IngredientList from './IngredientList.jsx';

class Search extends React.Component {
  render () {
    return (
      <div className="search">
<<<<<<< HEAD
      <h2>What ingredients do you have?</h2>
      <form>
        <input type='text' placeholder='rum' />
        <input type='submit' value = 'add'/>
      </form>
      <IngredientList />
=======
        <form className="searchView">
          <div className="title">What ingredients do you have?</div>
          <input type='text' placeholder='rum' />
          <input type='submit' value = 'Add'/>
        </form>
        <IngredientList />
>>>>>>> front_end_edits
      </div>
    )
  }
}

export default Search