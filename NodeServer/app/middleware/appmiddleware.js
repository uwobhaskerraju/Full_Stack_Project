const jwt = require('jsonwebtoken');
var validator = require("email-validator");
require('dotenv').config()

//References:
// 1. https://www.youtube.com/watch?v=mbsmsi7l3r4 - how to setup jwt secret key

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
var gblErrMsg = ''
// ************************* validation functions ******************************
function validateEmail(email) {
    if (validator.validate(email)) {

    }
    else {
        gblErrMsg = gblErrMsg.concat('Email is not in proper format||')
    }
    return true;
}
function validatePassword(pass) {

    if (Boolean(pass)) {

        if (pass.length > 7 && pass.length < 11) {

            // var regex = new Regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
            var letter = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            if (!pass.match(letter)) {
                gblErrMsg = gblErrMsg.concat('Password must have one upper&lower case English letter,one digit and special character and minimum 8 in length||')
            }
        }
        else {
            gblErrMsg = gblErrMsg.concat('Password should be between 8 and 10||')
        }
    }
    else {
        gblErrMsg = gblErrMsg.concat('Password cannot be empty||')
    }
    return true
}
function validateUserName(uName) {
    if (Boolean(uName)) {
        //Expression can start or end only with a letter
        //Expression cannot contain consecutive spaces
        var letter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/
        if (!uName.match(letter)) {
            gblErrMsg = gblErrMsg.concat('Username can start or end only with a letter and cannot contain consecutive spaces||')
        }
    }
    else {
        gblErrMsg = gblErrMsg.concat('Username cannot be empty||')
    }
    return true
}


// ************************* end of validation functions ************************


function userRegistrationCheck(req, res, next) {
    gblErrMsg = '';
    var inputs = sanitizeInputs(req);
    if (!inputs.email) return res.send({ statusCode: 500, result: errMsg })
    if (!inputs.username) return res.send({ statusCode: 500, result: errMsg })
    if (!inputs.password) return res.send({ statusCode: 500, result: errMsg })
    //write validation 
    //console.log(inputs)
    if (validateEmail(inputs.email)) {
        if (validatePassword(inputs.password)) {
            if (validateUserName(inputs.username)) {

            }
        }
    }

    if (Boolean(gblErrMsg)) {
        return res.send({ statusCode: 500, result: gblErrMsg })
    }
    else {
        req.secret = secret
        next();
    }
}

function sanitizeRequest(req,res,next){
    var body = req.body
    const entries = Object.keys(body)
    const inserts = {}
    for (let i = 0; i < entries.length; i++) {

        req.body[entries[i]] = req.sanitize(Object.values(body)[i])
    }
    next();
}

function checkRole(req, res, next) {
    //console.log("inside checkRole")
    var bearerHeader = req.headers["authorization"]
    if (bearerHeader === undefined) {
        return res.send({ statusCode: 500, message: errMsg })
    }
    else {
        var role = ['user', 'admin']
        var reqToken = bearerHeader.split(' ')[1]
        jwt.verify(reqToken, secret, (err, decoded) => {
            if (err) return res.status(500).send({ message: errMsg })
            //console.log(decoded);
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
   // console.log("inside checktoken")
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
    gblErrMsg = '';
    var inputs = sanitizeInputs(req);
    // console.log(exports)
    if (!inputs.email) return res.send({ message: errMsg })
    if (!inputs.password) return res.send({ message: errMsg })

    //write validations & sanitize here
    if (validateEmail(inputs.email)) {

    }
    if (Boolean(gblErrMsg)) {
        return res.send({ statusCode: 500, result: gblErrMsg })
    }
    else {
        req.secret = secret
        next();
    }

}

module.exports = {

    CheckRegistration: userRegistrationCheck,
    CheckToken: checkToken,
    CheckLogin: userLoginCheck,
    CheckRole: checkRole,
    Sanitize:sanitizeRequest
};