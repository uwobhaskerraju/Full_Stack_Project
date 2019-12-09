const jwt = require('jsonwebtoken');
var validator = require("email-validator");
require('dotenv').config()


const secret = process.env.JWT_KEY;
if (typeof secret === 'undefined') {
    console.log("Key not found. Exiting the process");
    process.exit(1);
}
function generateKeyValueFromBody(body) {
    const entries = Object.keys(body)
    const inserts = {}
    for (let i = 0; i < entries.length; i++) {
        inserts[entries[i]] = Object.values(body)[i]
    }
    return inserts;
}

function sanitizeInputs(req) {
    var body = req.body
    const entries = Object.keys(body)
    const inserts = {}
    for (let i = 0; i < entries.length; i++) {

        inserts[entries[i]] = req.sanitize(Object.values(body)[i])
    }
    return inserts;
}
const errMsg = '[INVALID] Not a valid request'
const gblErrMsg = ''
// ************************* validation functions ******************************
function validateEmail(email) {
    if (validator.validate(email)) {

    }
    else {
        gblErrMsg = 'Email is not in proper format||'
    }
    return true;
}
function validatePassword(pass) {
    if (Boolean(pass)) {
        var letter = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if (!pass.match(letter)) {
            gblErrMsg.concat('Password must have one upper&lower case English letter,one digit and special character and minimum 8 in length||')
        }
    }
    else {
        gblErrMsg = 'Password cannot be empty||'
    }
    return true
}
function validateUserName(uName) {
    if(Boolean(uName)){
        //Expression can start or end only with a letter
        //Expression cannot contain consecutive spaces
        var letter=/^([a-z]+\s)*[a-z]+$/
        if (!uName.match(letter)) {
            gblErrMsg.concat('Username can start or end only with a letter and cannot contain consecutive spaces||')
        }
    }
    else {
        gblErrMsg = 'Username cannot be empty||'
    }
    return true
}


// ************************* end of validation functions ************************


function userRegistrationCheck(req, res, next) {
    
    var inputs = sanitizeInputs(req);
    if (!inputs.email) return res.send({ statusCode :500,result: errMsg })
    if (!inputs.username) return res.send({ statusCode :500,result: errMsg })
    if (!inputs.password) return res.send({ statusCode :500,result: errMsg })
    //write validation 
    
    if (validateEmail(inputs.email)) {
        if (validatePassword(inputs.password)) {
            if (validateUserName(inputs.username)) {

            }
        }
    }
    if(Boolean(gblErrMsg)){
        return res.send({ statusCode :500,result: gblErrMsg })
    }
    else{
        req.secret = secret
        next();
    }
}

function checkRole(req, res, next) {
    var bearerHeader = req.headers["authorization"]
    if (bearerHeader === undefined) {
        return res.send({ statusCode: 500, message: errMsg })
    }
    else {
        var role = ['user', 'admin']
        var reqToken = bearerHeader.split(' ')[1]
        jwt.verify(reqToken, secret, (err, decoded) => {
            if (err) return res.status(500).send({ message: errMsg })
            console.log(decoded);
            if (role.includes(decoded["userType"])) {
                switch (decoded["userType"]) {
                    case "user":
                        if (!(req.url.split('/')[1].toLowerCase() == "secure")) {
                            return res.status(500).send({ message: errMsg })
                        }
                        break;
                    case "admin":
                        if (!(req.url.split('/')[1].toLowerCase() == "admin")) {
                            return res.status(500).send({ message: errMsg })
                        }
                        break;
                }
            }
            else return res.status(500).send({ message: errMsg })
            next();
        });
    }
}

function checkToken(req, res, next) {
    //console.log(req.headers)
    var bearerHeader = req.headers["authorization"]
    if (bearerHeader === undefined) {
        return res.send({ statusCode: 500, message: errMsg })
    }
    else {

        var reqToken = bearerHeader.split(' ')[1]
        jwt.verify(reqToken, secret, (err, decoded) => {
            if (err) return res.status(500).send({ message: errMsg })
            req.secret = secret;
            req.token = reqToken;
            next();
        });
    }
}


function userLoginCheck(req, res, next) {
    var exports = generateKeyValueFromBody(req.body)
    // console.log(exports)
    if (!exports.email) return res.send({ message: errMsg })
    if (!exports.password) return res.send({ message: errMsg })

    //write validations & sanitize here

    req.secret = secret
    next();
}

module.exports = {

    CheckRegistration: userRegistrationCheck,
    CheckToken: checkToken,
    CheckLogin: userLoginCheck,
    CheckRole: checkRole
};