/*
last child part is resultList and favoriteList

CocktailDetails will have the drink data passed to it through props

will render drink details

*/
import React from 'react';
// render
  // div
    // will get strInstructions as props
    // add the html and css to this
class CocktailDetails extends React.Component {
  render() {
    return (
      <div>
        <h1>Drink Details</h1>
        <div>
          <h4>name of recipe</h4>
        </div>
        <div>
          <p>description</p>
        </div>
      </div>
    )
  }


}

export default CocktailDetails;