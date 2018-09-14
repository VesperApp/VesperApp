const sequelize = require('./sequelize');
const User = require('./Users');
const Drink = require('./Drinks');
const Favorite = require('./Favorites');
const Ingredient = require('./Ingredients');
const DrinkIngredient = require('./DrinkIngredients');
const Comment = require('./Comments');


User.hasMany(Drink, { foreignKey: 'creator_ID' });

Drink.belongsToMany(Ingredient, { through: 'DrinkIngredients' });

Ingredient.belongsToMany(Drink, { through: 'DrinkIngredients' });


sequelize.sync({force:true}).then(()=>{
    User.create({
        user_name: "HI12345",
        password: "Sequelize.STRING",
    // picture_url: "Sequelize.STRING",
    }).then(user => {
        Drink.create({
            drink_name: "Drinkname12334"
        }).then(drink => 
            user.setDrinks([drink]).then(data=>console.log("this is the data",data))
        )
    })
})