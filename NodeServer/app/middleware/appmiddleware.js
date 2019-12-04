const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.JWT_KEY;
if (typeof secret === 'undefined') {
    console.log("Please set secret as environment variable. E.g. JWT_KEY=\"Open Sesame\" node index");
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

const errMsg = '[INVALID] Not a valid request'

function userRegistrationCheck(req, res, next) {
    var exports = generateKeyValueFromBody(req.body)
   // console.log(exports)
    if (!exports.email) return res.send({ message: errMsg })
    if (!exports.username) return res.send({ message: errMsg })
    if (!exports.password) return res.send({ message: errMsg })
    //write validation & sanitize code here

    req.secret=secret
    next();
}

function checkToken(req, res, next){
    var bearerHeader=req.headers["Authorization"]
    if(typeof bearerHeader==undefined) return res.status(500).send({message:errMsg})
    var reqToken=bearerHeader.split(' ')[1]
    jwt.verify(reqToken,secret,(err,decoded)=>{
        if(err) return res.status(500).send({message:errMsg})
        req.secret=secret;
        req.token=reqToken;
        next();
    });

}

function userLoginCheck(req, res, next){
    var exports = generateKeyValueFromBody(req.body)
   // console.log(exports)
    if (!exports.email) return res.send({ message: errMsg })
    if (!exports.password) return res.send({ message: errMsg })

    //write validations & sanitize here

    req.secret=secret
    next();
}

module.exports =  {

    CheckRegistration:userRegistrationCheck,
    CheckToken:checkToken,
    CheckLogin:userLoginCheck
};