const DrinksData = require('../data/drinks');
const { migrateDrinks } = require('./_migrateDrinks');

const sectionLength = (DrinksData.length - (DrinksData.length % 5)) / 5;
const drinksData02 = DrinksData.slice(sectionLength, 2 * sectionLength);

migrateDrinks(drinksData02);
