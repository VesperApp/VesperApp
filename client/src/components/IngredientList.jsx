import React from 'react';

class IngredientList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {ingredients} = this.props;
    const ingredientItems = ingredients.map((ingredient, i) =>
      <div className="item" key={i}>
        <span>{ingredient}</span>
        <span
          onClick={() => this.props.onRemove(ingredient)}
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
        {ingredientItems}
        <input type="submit" value="Submit"/>
      </div>
    )
  }
}

export default IngredientList