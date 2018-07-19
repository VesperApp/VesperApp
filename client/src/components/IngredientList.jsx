import React from 'react';

const IngredientList = (props) => {
  const {ingredients} = props;
  const IngredientItems = ingredients.map((ingredient, i) =>
    <div className="item" key={i}>
      <span>{ingredient}</span>
      <span
        onClick={() => props.onRemove(ingredient)}
        className="putRigth">
        X
      </span>
    </div>
  );

  return (
    <div className="ingredientLists">
      <div className="title">
        This is the selected IngredientList component
      </div>
      {IngredientItems}
      <input type="submit" value="Submit"/>
    </div>
  )
}

export default IngredientList;