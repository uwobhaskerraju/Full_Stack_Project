var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');
const saltRounds = 10000;
const keylength = 512;
const alg = 'sha512';
const tokenExpiry="1h"
const errMsg = "something went wrong! try again"
const User = require('../models/user.model.js');



function generateKeyValueFromBody(body) {
    const entries = Object.keys(body)
    const inserts = {}
    for (let i = 0; i < entries.length; i++) {
        inserts[entries[i]] = Object.values(body)[i]
    }
    return inserts;
}

exports.registerUser = (req, res) => {

    User.findOne({ email: req.body.email })
        .then(data => {
            if (data) {
                // table has user so end the request
                return res.status(200).send({ message: "Username already exists. Try Logging in" })
            }
            else {
                console.log("inside else")
                //register user
                let salt = crypto.randomBytes(16).toString('hex');
                let hash = crypto.pbkdf2Sync(req.body.password, salt, saltRounds, keylength, alg).toString('hex');
                var userObj = {
                    "username": req.body.username,
                    "password": hash,
                    "salt": salt,
                    "email": req.body.email,
                    "emailverified": false,
                    "usertype": "user",
                    "signupmethod": "registration"
                };
                const user = new User(userObj);
                user.save()
                    .then(data => {
                        var objToken = {
                            "email": userObj.email,
                            "id": data["_id"],
                            "name": userObj.username,
                            "active":data["active"],
                            "userType":data["usertype"]
                        }
                        let token = jwt.sign(objToken, req.secret, { expiresIn: tokenExpiry });
                        res.status(200).send({ "statusCode": 200, "result": objToken, "WWW-Authenticate": token });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || errMsg
                        })
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });

};

exports.validateLogin = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(data => {
           // console.log(data)
            if (!data) return res.status(400).send({ message: "Invalid Username / Password" })

            const hash = crypto.pbkdf2Sync(req.body.password, data.salt, saltRounds, keylength, alg).toString('hex');
            if (hash == data.password) {
                // user found
                var objToken = {
                    "email": data.email,
                    "id": data["_id"],
                    "name": data.username,
                    "active":data["active"],
                    "userType":data["usertype"]
                }
                let token = jwt.sign(objToken, req.secret, { expiresIn: tokenExpiry });
                res.status(200).send({ "statusCode": 200, "result": objToken, "WWW-Authenticate": token });
            }
            else return res.status(400).send({ message: "Invalid Username / Password" })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });
};