'use strict'
const { login } = require('../mongo/Auth/Login');
const { register } = require('../mongo/Auth/Register')
const { verifyToken } = require('../mongo/Auth/Verifytoken');
const { getData } = require('./Frauds/Frauds')
const { newPayment } = require('./Payments/Payments');
const { registerfraud} = require('./Frauds/RegisterFraud');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
// const { registerfraud } = require('./Frauds/RegisterFraud');
dotenv.config();


const app = express();

app.use(cors());
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", async(req, res) => {
    await login(req, res);
 });

 app.post("/register", async(req,res) => {
    console.log(res.data);
          await register(req, res);
  })

  app.get('/data', verifyToken, async(req, res)=>{
    let fraudlist = await getData(req);
    res.send(fraudlist)
  })

  app.post('/newpayment', verifyToken, async(req, res) =>{
    await newPayment(req, res);
    // res.send({ message: "Entered successfully" });
  })

  app.post('/registerfraud', verifyToken, async(req, res) => {
    await registerfraud(req, res);
  })

  app.listen(port, () => {
    console.log("Server is live and listening at port :", port);
  })