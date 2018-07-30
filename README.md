# Andy's Tropical Beach Party App

Hello HRR32, thanks for viewing our app! This is a clean platform to implement whatever new API, framework, tech that you want more practice/experience with! We summarized some quick points below so you could easily jump right in. 

Our vision: Andy is a Virtual mixologist AI. Integrate Andy in your next cocktail experience by providing Andy with the drink ingredients you have at hand and instantly recieve relevant mixed drink recipes. Gain new insight with what you have and turn any garthering into a party.

## Usage

We relied on TheCocktailDB.com API. We were able to download a significant portion of the API database to test search alogrithm queries locally. Thus, locally we have over 300 drinks and 150 ingredients to query Mongo directly. Please reference the data in the folder: ./database/data/drinks.js for a look at the data schema. We relied on Mongo and Moongoose ORM. The database files for Mongoose are split into seperate files for drinks, ingredients, and users located at ./database. Our "search query" is found in ./database/drink.js which queries Mongo given the provided drink ingredients. 

Files are organized following the solo-MVP file path organization structure. Front-end files are located in ./client with React component files located in ./client/src/components. We did not have an opportunity to use a front end framework. Given the current minium number of pages, it would be a good opporunity to use a front end framework for consistant styling. 

Server files are located in ./server/index.js. Our authentication is not fully fleshed out and relies on localStorage of sessions. This should be fixed for something more persistant and secure which also impacts our user favorites function. 

## Requirements

- Node 0.10.x
- React ^16.4.1
- Express ^4.16.3
- webpack ^4.16.1
- mongoose ^5.2.4

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

As always, feel free to reach out to any of us if you have any questions. 
