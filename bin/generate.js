#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const chalk = require('chalk');

// Function to ask user whether to stop or overwrite existing files
const askUser = (message) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(chalk.blue(message), (answer) => {
      rl.close();
      resolve(answer.toLowerCase());
    });
  });
};

// Define folder and file paths
const folders = [
  path.join(process.cwd(), 'DBConfig'),
  path.join(process.cwd(), 'src', 'models')
];

const files = [
  {
    path: path.join(process.cwd(), 'DBConfig', 'DBConfig.js'),
    content: `import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("Mongodb connected successfully");
        });
    } catch (error) {
        console.log("Something went wrong", error);
    }
};`
  },
  {
    path: path.join(process.cwd(), '.env'),
    content: `MONGO_URL="<Your mongo URL>"\n`
  },
  {
    path: path.join(process.cwd(), 'src', 'models', 'DemoModel.js'),
    content: `import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const DemoSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    
});

const Demo = mongoose.models.demo || mongoose.model("demo", DemoSchema);
export default Demo;`
  }
];

// Function to handle folder and file creation
const createFiles = async () => {
  for (let folder of folders) {
    if (!fs.existsSync(folder)) {
      fs.ensureDirSync(folder);
      console.log(chalk.green(`Created folder: ${folder}`));
    }
  }

  for (let file of files) {
    if (fs.existsSync(file.path)) {
      const answer = await askUser(`File ${file.path} already exists. Do you want to overwrite it? (y/n): `);
      if (answer !== 'y') {
        console.log(chalk.yellow(`Skipping file: ${file.path}`));
        continue;
      }
    }
    fs.outputFileSync(file.path, file.content);
    console.log(chalk.green(`Created file: ${file.path}`));
  }
};

// Run the function
createFiles();
