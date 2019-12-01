const Songs = require('../models/song.model.js');
const Reviews = require('../models/review.model.js');
const Ratings = require('../models/ratings.model.js');
const Playlist = require('../models/playlist.model.js');

const errMsg = "something went wrong! try again"

function generateKeyValueFromBody(body) {
    const entries = Object.keys(body)
    const inserts = {}
    for (let i = 0; i < entries.length; i++) {
        inserts[entries[i]] = Object.values(body)[i]
    }
    return inserts;
}


exports.validateUser = (req, res) => {
    console.log("inside validateUser user")
    res.send()
};

// register a user in DB
exports.registerUser = (req, res) => {
    // split username and password
    var uName = req.body.name
    var uEmail = req.body.email
    var uPass = req.body.pass
    var uType = 2 // type = user
    var uDeact = false

    var usalt = bcrypt.genSaltSync(10);
    var uHash = bcrypt.hashSync(uPass, usalt);


    //save to DB
    console.log("Uname : " + uName)
    console.log("Uemail : " + uEmail)
    console.log("uPass : " + uPass)
    console.log("usalt : " + usalt)
    console.log("uHash : " + uHash)

    res.send({ success: "true" })
};