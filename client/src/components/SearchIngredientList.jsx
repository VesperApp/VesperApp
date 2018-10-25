import React from 'react';

const IngredientList = props => {
  const { ingredients, onSubmit } = props;
  const IngredientItems = ingredients.map(ingredient => (
    <div className="item" key={ingredient[1]}>
      <span>{ingredient[0]}</span>
      <span onClick={() => props.onRemove(ingredient[0])} className="putRigth">
        X
      </span>
    </div>
  ));
  if (ingredients.length > 0) {
    return (
      <div className="ingredientLists">
        <div className="ingredientTitle">Your selected drink ingredients:</div>
        {IngredientItems}
        <input onClick={e => onSubmit(e, ingredients)} type="submit" value="Submit" />
      </div>
    );
  }
  return <div className="ingredientLists" />;
};

export default IngredientList;
