const Songs = require('../models/song.model.js');

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

exports.deactUser = (req, res) => {


};

exports.hideSong = (req, res) => {
    var songId = req.body.songID
    //console.log(songId)
    Songs.updateOne({ _id: songId }, { $set: { "Hidden": true } })
        //.then(dbModel => res.json(dbModel))
        .then(data => {
            //console.log(data["nModified"])
            if (Boolean(data["nModified"])) {

                res.status(200).send({ message: "success" })
            }
            else {
                res.status(200).send({ message: "false" })
            }

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            })
        });

};

exports.updateSong = (req, res) => {
    var songId = req.body.songID
    var reqBody = req.body
    delete reqBody.songID
    console.log(reqBody)
    
    Songs.update({ _id: songId }, { $set: { Ratings: 3 } })
        .then(data => {
            //console.log(data["nModified"])
            if (Boolean(data["nModified"])) {

                res.status(200).send({ message: "success" })
            }
            else {
                res.status(200).send({ message: "false" })
            }

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            })
        });

};