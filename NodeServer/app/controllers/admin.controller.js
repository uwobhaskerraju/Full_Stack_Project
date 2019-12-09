const Songs = require('../models/song.model.js');
const Reviews = require('../models/review.model.js');
const Ratings = require('../models/ratings.model.js');
const Playlist = require('../models/playlist.model.js');
const User = require('../models/user.model.js');

const errMsg = "something went wrong! try again"

function generateKeyValueFromBody(body) {
    const entries = Object.keys(body)
    const inserts = {}
    for (let i = 0; i < entries.length; i++) {
        inserts[entries[i]] = Object.values(body)[i]
    }
    return inserts;
}
exports.insertSong = (req, res) => {
    //inserting songs records first and then sending the songID back to angular
    // using songID, send another request for inserting review
    // using songID, send another request for inserting ratings
    const inserts = generateKeyValueFromBody(req.body)
    Songs.create(inserts)
        .then(data => {
            if (Boolean(data["_id"])) {
                res.send({ statusCode: 200, result: data["_id"] })
            }
            else {
                // didnt insert 
                res.send({ statusCode: 400, result: "false" })
            }
        })
        .catch(err => {
            res.send({ statusCode: 500, result: err.message || errMsg })
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

                //res.send({ statusCode: 200, result: songId })
                //delete reviews
                Reviews.deleteMany({ songId: songId })
                    .then(da => {
                        if (Boolean(da["deletedCount"])) {
                            // delete ratings
                            Ratings.deleteMany()
                                .then(d => {
                                    if (Boolean(da["deletedCount"])) {
                                        res.send({ statusCode: 200, result: songId })
                                    }
                                    else {
                                        res.send({ statusCode: 300, result: songId })
                                    }
                                })
                                .catch(err => {
                                    res.send({
                                        statusCode: 500, result: err.message || errMsg
                                    })
                                });
                        }
                        else {
                            res.send({ statusCode: 300, result: songId })
                        }
                    })
                    .catch(err => {
                        res.send({
                            statusCode: 500, result: err.message || errMsg
                        })
                    });
            }
            else {
                res.send({ statusCode: 300, result: songId })
            }

        })
        .catch(err => {
            res.send({
                statusCode: 500, result: err.message || errMsg
            })
        });
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

exports.updateSong = (req, res) => {
    const inserts = generateKeyValueFromBody(req.body)
    var songid = inserts.songID
    delete inserts.songID
    Songs.updateOne({ _id: songid }, { $set: inserts })
        .then(data => {
            if (Boolean(data["nModified"])) {
                res.send({ statusCode: 200, result: "true" })
            }
            else {
                // didnt insert 
                res.send({ statusCode: 300, result: "false" })
            }
        })
        .catch(err => {
            res.send({ statusCode: 500, result: err.message || errMsg
            })
        });
}

exports.deleteReview = (req, res) => {
    var reviewID = req.body.reviewid

    Reviews.deleteOne({ _id: reviewID })
        .then(data => {
            //console.log(data["nModified"])
            if (Boolean(data["deletedCount"])) {

                res.send({ statusCode: 200, result: "success" })
            }
            else {
                res.send({ statusCode: 300, result: "false" })
            }

        })
        .catch(err => {
            res.send({
                statusCode: 500, result: err.message || errMsg
            })
        });
};

exports.createPList = (req, res) => {

    const inserts = generateKeyValueFromBody(req.body)

    //console.log(inserts)
    Playlist.create(inserts)
        .then(data => {
            if (Boolean(data["_id"])) {
                res.send({ statusCode: 200, result: data["_id"] })
            }
            else {
                // didnt insert 
                res.send({ statusCode: 400, result: "false" })
            }
        })
        .catch(err => {
            res.send({
                statusCode: 500, result: err.message || errMsg
            })
        });
    // res.send(200)
};

exports.deletePList = (req, res) => {
    var playListID = req.body.playListID

    //console.log("s")
    Playlist.findOne({
        _id: playListID
    })
        .remove()
        .exec()
        //.then(data=>res.send(data))
        .then(data => {
            if (Boolean(data["deletedCount"])) {
                res.send({ statusCode: 200, message: "true" })
            }
            else {
                // didnt insert 
                res.send({ statusCode: 400, message: "false" })
            }
        })
        .catch(err => {
            res.send({
                statusCode: 500,
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
                res.send({ statusCode: 200, message: "true" })
            }
            else {
                // didnt insert 
                res.send({ statusCode: 400, message: "false" })
            }
        })
        .catch(err => {
            res.send({
                statusCode: 500,
                message: err.message || errMsg
            })
        });
};
exports.hidePList = (req, res) => {
    var playListID = req.body.playListID
    var hidden = req.body.hidden


    Playlist.updateOne({ _id: playListID }, { $set: { hidden: hidden } })
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
exports.deactUser = (req, res) => {

    var userID = req.body.userID
    var isActive = req.body.isActive
    User.updateOne({ _id: userID }, { $set: { active: isActive } })
        //.then(data=>res.send(data))
        .then(data => {
            if (Boolean(data["nModified"])) {
                res.send({ statusCode: 200, result: "true" })
            }
            else {
                // didnt insert 
                res.send({ statusCode: 300, result: "false" })
            }
        })
        .catch(err => {
            res.send({
                statusCode: 500, result: err.message || errMsg
            })
        });
};

exports.getAllSongs = (req, res) => {
    Songs.find()
        .then(data => {
            res.send({
                statusCode: 200,
                result: data
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });
}
exports.GetAllPlayLists = (req, res) => {
    Playlist.find()
        .then(data => res.send({
            statusCode: 200,
            result: data
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });
};

exports.getAllUsers = (req, res) => {
    User.find({})
        .select("username usertype active email ")
        .then(data => {
            res.send({
                statusCode: 200,
                result: data
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });
};

exports.makeUserAdmin = (req, res) => {
    var userID = req.body.userID
    var isAdmin = req.body.isAdmin
    isAdmin = (isAdmin == true) ? "admin" : "user";
    console.log(isAdmin)
    User.updateOne({ _id: userID }, { $set: { usertype: isAdmin } })
        //.then(data=>res.send(data))
        .then(data => {
            if (Boolean(data["nModified"])) {
                res.send({ statusCode: 200, result: "true" })
            }
            else {
                // didnt insert 
                res.send({ statusCode: 300, result: "false" })
            }
        })
        .catch(err => {
            res.send({
                statusCode: 500, result: err.message || errMsg
            })
        });
};