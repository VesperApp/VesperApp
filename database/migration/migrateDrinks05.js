const DrinksData = require('../data/drinks');
const { migrateDrinks } = require('./_migrateDrinks');

const sectionLength = (DrinksData.length - (DrinksData.length % 5)) / 5;
const drinksData05 = DrinksData.slice(4 * sectionLength);

migrateDrinks(drinksData05);
