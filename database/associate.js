const sequelize = require('./sequelize');
const User = require('./Users');
const Drink = require('./Drinks');
const avorite = require('./Favorites');

User.belongsToMany(Drink, { through: 'Favorites' });
User.hasMany(Drink, { foreignKey: 'creator_ID' });

Drink.belongsToMany(User, { through: 'Favorites' });



sequelize.sync({force:true});