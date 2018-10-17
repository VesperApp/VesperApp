import React from 'react';

const SearchIngredientList = ({ value, measurement, ingredientName }) => (
  <tr>
    <td>{value + 1}</td>
    <td>{measurement}</td>
    <td>{ingredientName}</td>
  </tr>
);

export default SearchIngredientList;
