
'use strict';
const mongoose = require("mongoose");

const { connectDB } = require("../Connect/Connect");

const newPayment = async (req, res) => {
  const { name, email, phno, upiId } = req.body;

  let mongoDB = await connectDB();

  // Check if upiId exists in the "frauds" collection
  let collectionCheck = mongoDB.collection("frauds");
  let result = await collectionCheck.findOne({ bad_upiId: upiId });

  if (result) {
    // If upiId is found in "frauds" collection, send an appropriate message
    res.json({ message: "Bad UPI Id, payment not allowed" });
  } else {
    // If upiId is not found, proceed to insert/update into "paymentdetails" collection
    let collection = mongoDB.collection("paymentdetails");

    // Check if the email already exists in "paymentdetails" collection
    let existingUser = await collection.findOne({ Email: email });

    if (existingUser) {
      // If the new upiId is different from the previous one, update it
      if (existingUser.UPI_ID !== upiId) {
        try {
          collection.updateOne(
            { Email: email },
            { $push: { UPI_ID: upiId } }
          );
          console.log("Updated UPI_ID for existing user");
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Internal Server Error" });
          return;
        }
      }

      res.status(200).json({ message: "User already exists. UPI_ID updated." });
    } else {
      // If the user does not exist, insert into "paymentdetails" collection
      try {
        collection.insertOne({
          Name: name,
          Email: email,
          Phone: phno,
          UPI_ID: [upiId],
        });
        console.log("Inserted new user details");
        res.status(200).json({ message: "Payment details added successfully" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
};

module.exports = {
  newPayment,
};

