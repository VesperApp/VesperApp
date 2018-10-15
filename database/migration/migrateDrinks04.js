const DrinksData = require('../data/drinks');
const { migrateDrinks } = require('./_migrateDrinks');

const sectionLength = (DrinksData.length - (DrinksData.length % 5)) / 5;
const drinksData04 = DrinksData.slice(3 * sectionLength, 4 * sectionLength);

migrateDrinks(drinksData04);
