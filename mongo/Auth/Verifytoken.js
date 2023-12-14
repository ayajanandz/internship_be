const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config();
const KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if(token) {
        token = token.split(' ')[1];
        jwt.verify(token, KEY, (err, valid) => {
            if(err) {
                res.send({ result: "Please provide valid token" });

            } else {
                next();
            }
        })
    } else {
        res.send({ result: "Please add token with header" });
    }
}

module.exports = { 
    verifyToken,
};

