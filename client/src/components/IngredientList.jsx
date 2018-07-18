import React from 'react';

class IngredientList extends React.Component {
  render() {
    return (
      <div className="ingredientLists">
      <div className="title">
        This is the selected IngredientList component
      </div>
      <div className="item">
        <span>Sucre</span>
        <span className="putRigth">X</span>
      </div>

      <input type="submit" value="Submit"/>
      </div>
    )
  }
}

export default IngredientList