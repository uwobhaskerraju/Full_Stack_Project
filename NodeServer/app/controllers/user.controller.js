var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');
var bcrypt = require('bcryptjs');
const saltRounds = 10000;
const keylength = 512;
const alg = 'sha512';
const tokenExpiry = "1h"
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
                return res.send({ statusCode: 300, result: "Username already exists. Try Logging in" })
            }
            else {

                //register user
                //let salt = crypto.randomBytes(16).toString('hex');
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return res.send({ statusCode: 500, result: "something went wrong!" })
                    }
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        if (err) {
                            return res.send({ statusCode: 500, result: "something went wrong!" })
                        }
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
                                    "emailverified": data["emailverified"],
                                    "userType": data["usertype"]
                                }
                                let token = jwt.sign(objToken, req.secret, { expiresIn: tokenExpiry });
                                res.send({ statusCode: 200, result: objToken, "WWW-Authenticate": token });
                            })
                            .catch(err => {
                                res.send({
                                    statusCode: 500,
                                    result: err.message || errMsg
                                })
                            });
                    });
                });
                //let hash = crypto.pbkdf2Sync(req.body.password, salt, saltRounds, keylength, alg).toString('hex');


            }
        })
        .catch(err => {
            res.send({
                statusCode: 500,
                result: err.message || errMsg
            })
        });

};

exports.validateLogin = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(data => {
            // console.log(data)
            if (!data) return res.send({ statusCode: 400, result: "Invalid Username / Password" })
            if (!data["active"]) return res.send({ statusCode: 400, result: "Contact Admin to re-activate your account" })

            bcrypt.compare(req.body.password, data.password, function (err, resp) {
                if (err) {
                    return res.send({ statusCode: 400, result: "Invalid Username / Password" })
                }
                if (resp) {
                    var objToken = {
                        "email": data.email,
                        "id": data["_id"],
                        "name": data.username,
                        "emailverified": data["emailverified"],
                        "userType": data["usertype"]
                    }
                    let token = jwt.sign(objToken, req.secret, { expiresIn: tokenExpiry });
                    res.send({ statusCode: 200, result: objToken, "WWW-Authenticate": token });
                }
                else {
                    return res.send({ statusCode: 400, result: "Invalid Username / Password" })
                }
            });
        })
        .catch(err => {
            res.send({
                statusCode: 500, result: err.message || errMsg
            })
        });
};