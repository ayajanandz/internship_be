"use strict";

const { connectDB } = require("../Connect/Connect");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config();

const login = async (req, res) => {
  const KEY = process.env.SECRET_KEY;
  const { email, password } = req.body;
  

  // CONNECTION WITH COLLECTIONS

  let mongoDB = await connectDB();
  let collection = mongoDB.collection("users");
 
  let dbResponse = await collection.findOne({ Email: email });

if (dbResponse) {
  if (password === dbResponse.Password) {
    const { Password, ...userWithoutPassword } = dbResponse;

    // Generate a JWT token
    const token = jwt.sign({ email: userWithoutPassword.Email }, KEY, {
      expiresIn: "1h", // Token expiration time
    });
    console.log(token)
     const id = dbResponse._id;
    // Returning the JWT token to the frontend
    res.status(200).json({ token, body: userWithoutPassword });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
} else {
  res.status(404).json({ message: "User not registered" });
}
}
module.exports = {
  login,
};
