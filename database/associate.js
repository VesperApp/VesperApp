const sequelize = require('./sequelize');
const User = require('./Users');

const DrinkMethods = require('./Drinks');
const Drink = DrinkMethods.Drink;
const Catagory = DrinkMethods.Catagory;
const Glass = DrinkMethods.Glass;

const Favorite = require('./Favorites');

// User.belongsToMany(Drink, { through: 'Favorites' });
User.hasMany(Drink, { foreignKey: 'creator_ID' });
// Drink.belongsToMany(User, { through: 'Favorites' });
Catagory.hasMany(Drink, { foreignKey: 'catagory_ID' });
Glass.hasMany(Drink, { foreignKey: 'glass_ID' });

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

    User.create({
        user_name:"heeheehee",
        password: "securepassword"
    })
}) 