# MongoConfig

**MongoConfig** is an NPM package that helps developers quickly set up basic MongoDB configuration using Mongoose. The package automatically generates the required folder and file structure, including configuration files, a `.env` file for MongoDB connection URL, and a sample Mongoose model.

## Features

- Generates a `DBConfig.js` file with MongoDB connection logic using Mongoose.
- Creates an `.env` file with a placeholder for the MongoDB connection URL.
- Adds a basic Mongoose model (`DemoModel.js`) to the `src/models` folder.
- Prompts to overwrite existing files or skip them.

## Installation

To install the package, run the following command:


- npm install dbconfig-mongo
- npx generate dbConfig

## Using DBConfig Instance in API routes

- import {connect} from '@/DBConfig/DBConfig';
- // import Model here...
- connect();

- // perform POST/GET/PUT... operations here...




