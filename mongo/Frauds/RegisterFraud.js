'use strict';
//make it a common method - getDataFromDb
const {connectDB} = require('../Connect/Connect');

const registerfraud = async (req,res) => {
    const { badId } = req.body;
    console.log(badId);

       
    let mongoDB = await connectDB();
    let collection = mongoDB.collection("frauds");
    let existingFraud = await collection.findOne({ bad_upiId: badId });

    if (existingFraud) {
        // If upiId is found, increase the count
        try {
          await collection.updateOne(
            { bad_upiId: badId },
            { $inc: { count: 1 } }
          );
          console.log("Increased count for existing badupiId");
          res.json({ message: "Updated Successfully !"})
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Internal Server Error" });
          return;
        }
      } else {
        // If upiId is not found, add a new entry with count = 1
        try {
          await collection.insertOne({
            bad_upiId: badId,
            count: 1,
          });
          console.log("Added new badupiId to the frauds collection");
         res.json({ message: "Added Successfully !"})
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Internal Server Error" });
          return;
        }
}
}
module.exports = {
    registerfraud,
  };