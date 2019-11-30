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

exports.delSong = (req, res) => {
    var songId = req.body.songID

    Songs.deleteOne({ _id: songId })
        //.then(dbModel => res.json(dbModel))
        .then(data => {
            //console.log(data["nModified"])
            if (Boolean(data["deletedCount"])) {

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

exports.insertSong = (req, res) => {
   //inserting songs records first and then sending the songID back to angular
   // using songID, send another request for inserting review
    const entries = Object.keys(req.body)
    const inserts = {}
    for (let i = 0; i < entries.length; i++) {
        inserts[entries[i]] = Object.values(req.body)[i]
    }
    
    // var reviews={}
    // reviews["comment"]=inserts.comment
    // reviews["reviewBy"]=inserts.reviewBy

    // delete inserts.comment
    // delete inserts.reviewBy
 
    Songs.create(inserts)
        .then(data => {
            if(Boolean(data["_id"])){
                res.status(200).send({message:data["_id"]})
            }
            else{
                res.status(500).send({message:"false"})
            }    
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            })
        });

};