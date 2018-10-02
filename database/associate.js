const sequelize = require('./sequelize');
const User = require('./Users');

const Drink = require('./Drinks');
const Category = require('./Categories');
const Glass = require('./Glasses');
const Ingredient = require('./Ingredients');

const Favorite = require('./Favorites');

// User.belongsToMany(Drink, { through: 'Favorites' });
User.hasMany(Drink, { foreignKey: 'creator_ID' });
// Drink.belongsToMany(User, { through: 'Favorites' });
Category.hasMany(Drink, { foreignKey: 'category_ID' });

Glass.hasMany(Drink, { foreignKey: 'glass_ID' });

Drink.belongsToMany(Ingredient, { through: 'DrinkIngredient' });
Ingredient.belongsToMany(Drink, { through: 'DrinkIngredient' });

// sequelize.sync({force:true}).then(()=>{

//     User.create({
//         user_name: "HI12345",
//         password: "Sequelize.STRING",
//     // picture_url: "Sequelize.STRING",
//     }).then(user => {
//         Drink.create({
//             drink_name: "Drinkname12334"
//         }).then(drink => 
//             user.setDrinks([drink]).then(data=>console.log("this is the data",data))
//         )
//     })

//     User.create({
//         user_name:"heeheehee",
//         password: "securepassword"
//     })

//     //create a "shot" && "glass" catagory to associate it with a Drink:
//     // first create the catagory "shot"
//     Category.create({
//         category_name: "shots123"
//     }).then(
//         newCategory=> 
//             // first create the catagory "glass"
//             Glass.create({
//                 glass_name: "Shot Glass123"
//             }).then(newGlass =>
//                 //then create the Drink
//                 Drink.create({
//                     drink_name: "drink name123",
//                     picture_url: "www.drinkpic123.com"
//                 }).then(drink => 
//                   {  //associate the "shot" && "glass" with the "drink":
//                     newCategory.setDrinks([drink]).then(data=> console.log("this is the glass data:",data))
//                     newGlass.setDrinks([drink]).then(data=> console.log("this is the glass data:",data))}
//                 )
//             )
//         )



// }) 

module.exports = {
  sequelize,
  User,
  Drink,
  Category,
  Glass,
  Ingredient,
  Favorite,
};
