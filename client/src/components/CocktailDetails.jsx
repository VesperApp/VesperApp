import React from 'react';

const CocktailDetails = (props) => {
  const imgStyle = {
    width: '50%',
    height: '50%',
    margin: 'auto',
    display: 'block'
  };
  const {drink} = props;
  if (drink) {
    return (
      <div className="formView">
        <h4>{`${drink.strDrink}'s Recipe`}</h4>
        <div>
          <p>{drink.strInstructions}</p>
          <img
            src={drink.strDrinkThumb}
            style={imgStyle}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>
  }
};

export default CocktailDetails;