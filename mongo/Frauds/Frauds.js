'use strict';
//make it a common method - getDataFromDb
const {connectDB} = require('../Connect/Connect');

const getData = async (req) => {
    console.log(req);
       
    let mongoDB = await connectDB();
    let collection = mongoDB.collection("frauds");
    let data = await collection.find({}).toArray();
    console.log(data);
    return data;
}


module.exports = {
    getData
};