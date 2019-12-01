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

exports.deactUser = (req, res) => {


};

exports.hideSong = (req, res) => {
    var songId = req.body.songID
    var hidden = req.body.hidden
    //console.log(songId)
    Songs.updateOne({ _id: songId }, { $set: { Hidden: hidden } })
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
                message: err.message || errMsg
            })
        });

};

exports.updateRating = (req, res) => {
    var songId = req.body.songID
    var rating = req.body.Ratings

    Ratings.update({ songID: songId }, { $set: { ratings: rating } })
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
                message: err.message || errMsg
            })
        });

};

exports.delSong = (req, res) => {
    // 1. delete song by passing songID
    // 2. delete song ratings by passing songID
    // 3. delete song reviews by passing songID
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
                message: err.message || errMsg
            })
        });
};

exports.delsongrating = (req, res) => {
    var songId = req.body.songID
    Ratings.deleteMany({ songID: songId })
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
                message: err.message || errMsg
            })
        });
};

exports.deleteSongRev = (req, res) => {
    var songId = req.body.songID
    Reviews.deleteMany({ songId: songId })
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
                message: err.message || errMsg
            })
        });
};

exports.insertSong = (req, res) => {
    //inserting songs records first and then sending the songID back to angular
    // using songID, send another request for inserting review
    // using songID, send another request for inserting ratings
    const inserts = generateKeyValueFromBody(req.body)
    Songs.create(inserts)
        .then(data => {
            if (Boolean(data["_id"])) {
                res.status(200).send({ message: data["_id"] })
            }
            else {
                // didnt insert 
                res.status(500).send({ message: "false" })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });

};

exports.ratesong = (req, res) => {
    // if it doesnt insert, send deleteSong API from angular
    const inserts = generateKeyValueFromBody(req.body)
    var songID = inserts["songId"]
    Ratings.create(inserts)
        .then(data => {
            if (Boolean(data["_id"])) {
                res.status(200).send({ message: "true" })
            }
            else {
                // didnt insert 
                res.status(500).send({ message: songID })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: songID
            })
        });
};

exports.reviewSong = (req, res) => {
    // if it doesnt insert, send deleteSong API from angular

    const inserts = generateKeyValueFromBody(req.body)
    var songID = inserts["songId"]
    Reviews.create(inserts)
        .then(data => {
            if (Boolean(data["_id"])) {
                res.status(200).send({ message: "true" })
            }
            else {
                // didnt insert 
                // delete inserted song
                res.status(500).send({ message: songID })
            }
        })
        .catch(err => {
            // didnt insert 
            // delete inserted song
            res.status(500).send({ message: songID })
        });
};

exports.createPList = (req, res) => {

    const inserts = generateKeyValueFromBody(req.body)

    //console.log(inserts)
    Playlist.create(inserts)
        .then(data => {
            if (Boolean(data["_id"])) {
                res.status(200).send({ message: data["_id"] })
            }
            else {
                // didnt insert 
                res.status(500).send({ message: "false" })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });
    // res.send(200)
};

exports.deletePList = (req, res) => {
    var playListID = req.body.playListID
    var ownerID = req.body.ownerID
    //console.log("s")
    Playlist.findOne({
        _id: playListID,
        ownerID: ownerID
    })
        .remove()
        .exec()
        //.then(data=>res.send(data))
        .then(data => {
            if (Boolean(data["deletedCount"])) {
                res.status(200).send({ message: "true" })
            }
            else {
                // didnt insert 
                res.status(500).send({ message: "false" })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });
};

exports.addSongsPList = (req, res) => {
    var playListID = req.body.playListID
    var songid = req.body.songID

    Playlist.updateOne({ _id: playListID }, { "$push": { "songID": songid } })
        //.then(data=>res.send(data))
        .then(data => {
            if (Boolean(data["nModified"])) {
                res.status(200).send({ message: "true" })
            }
            else {
                // didnt insert 
                res.status(500).send({ message: "false" })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });
};

exports.remSongsPList = (req, res) => {
    var playListID = req.body.playListID
    var songid = req.body.songID

    Playlist.updateOne({ _id: playListID }, { "$pull": { "songID": songid } })
        //.then(data=>res.send(data))
        .then(data => {
            if (Boolean(data["nModified"])) {
                res.status(200).send({ message: "true" })
            }
            else {
                // didnt insert 
                res.status(500).send({ message: "false" })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });
};

exports.hidePList = (req, res) => {
    var playListID = req.body.playListID
    var hidden = req.body.hidden
    var ownerID = req.body.ownerID

    Playlist.updateOne({ _id: playListID,ownerID:ownerID }, { $set: { hidden: hidden } })
        //.then(data=>res.send(data))
        .then(data => {
            if (Boolean(data["nModified"])) {
                res.status(200).send({ message: "true" })
            }
            else {
                // didnt insert 
                res.status(500).send({ message: "false" })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });
};