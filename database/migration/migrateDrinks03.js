const DrinksData = require('../data/drinks');
const { migrateDrinks } = require('./_migrateDrinks');

const sectionLength = (DrinksData.length - (DrinksData.length % 5)) / 5;
const drinksData03 = DrinksData.slice(2 * sectionLength, 3 * sectionLength);

migrateDrinks(drinksData03);
