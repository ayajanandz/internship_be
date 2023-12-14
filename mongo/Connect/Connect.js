'use strict';

const dotenv = require('dotenv')
dotenv.config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI

const databaseName ='CheckFraud'
const client = new MongoClient(uri);

const connectDB = async () => {
    let result =  await client.connect();
    let mongoDB = result.db(databaseName);
    return mongoDB;
}

module.exports = {
    connectDB
};


