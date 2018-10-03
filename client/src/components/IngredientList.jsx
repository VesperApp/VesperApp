import React from 'react';

const IngredientList = props => {
  const { ingredients, onSubmit } = props;
  const IngredientItems = ingredients.map((ingredient, i) => (
    <div className="item" key={i}>
      <span>{ingredient}</span>
      <span onClick={() => props.onRemove(ingredient)} className="putRigth">
        X
      </span>
    </div>
  ));
  if (ingredients.length > 0) {
    return (
      <div className="ingredientLists">
        <div className="title">Your selected drink ingredients:</div>
        {IngredientItems}
        <input onClick={e => onSubmit(e, ingredients)} type="submit" value="Submit" />
      </div>
    );
  }
  return <div className="ingredientLists" />;
};

export default IngredientList;
