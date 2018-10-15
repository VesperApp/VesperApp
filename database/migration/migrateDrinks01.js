const DrinksData = require('../data/drinks');
const { migrateDrinks } = require('./_migrateDrinks');

const sectionLength = (DrinksData.length - (DrinksData.length % 5)) / 5;
const drinksData01 = DrinksData.slice(0, sectionLength);

migrateDrinks(drinksData01);
