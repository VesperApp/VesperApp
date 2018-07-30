# Andy's Tropical Beach Party App

Andy is a Virtual mixologist AI. Integrate Andy in your next cocktail experience by providing Andy with the drink ingredients you have at hand and instantly recieve relevant mixed drink recipes. Gain new insight with what you have and turn any garthering into a party.

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Contributing](#contributing)

## Usage

> Enter your current drink ingredients into the single search bar on the homepage. Andy will return relevant mixed drink recipes based on a carefully curated algorithm pared with a large (and growing!) database of drink recipes. 

We relied on TheCocktailDB.com API. We were able to download a significant portion of the API database to test search alogrithm queries locally. Please reference the data in the folder ./database/data/drinks.js for the database schema. 

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
