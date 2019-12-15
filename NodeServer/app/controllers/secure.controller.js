const Songs = require('../models/song.model.js');
const Reviews = require('../models/review.model.js');
const Ratings = require('../models/ratings.model.js');
const Playlist = require('../models/playlist.model.js');
const User = require('../models/user.model.js');
const mongoose = require('mongoose');

const errMsg = "something went wrong! try again"

function generateKeyValueFromBody(body) {
    const entries = Object.keys(body)
    const inserts = {}
    for (let i = 0; i < entries.length; i++) {
        inserts[entries[i]] = Object.values(body)[i]
    }
    return inserts;
}

// insert a new song
exports.insertSong = (req, res) => {
    //inserting songs records first and then sending the songID back to angular
    // using songID, send another request for inserting ratings
    // using songID, send another request for inserting review

    const inserts = generateKeyValueFromBody(req.body)
    Songs.create(inserts)
        .then(data => {
            if (Boolean(data["_id"])) {
                res.send({ statusCode: 200, result: data["_id"] })
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

// insert a rating for a song
exports.ratesong = (req, res) => {
    // if it doesnt insert, send deleteSong API from angular
    const inserts = generateKeyValueFromBody(req.body)
    var songID = inserts["songId"]
    Ratings.create(inserts)
        .then(data => {
            console.log(data)
            if (Boolean(data["_id"])) {
                res.send({ statusCode: 200, result: data["_id"] }) // passing this to support next failure
            }
            else {
                // didnt insert 
                res.send({ statusCode: 400, result: songID })
            }
        })
        .catch(err => {
            res.send({
                statusCode: 500, result: songID
            })
        });
};
// add a review for a song
exports.reviewSong = (req, res) => {
    // if it doesnt insert, send deleteSong API from angular

    const inserts = generateKeyValueFromBody(req.body)
    var songID = inserts["songId"]
    Reviews.create(inserts)
        .then(data => {
            if (Boolean(data["_id"])) {
                res.send({ statusCode: 200, result: "true" })
            }
            else {
                // didnt insert 
                // delete inserted song
                res.send({ statusCode: 400, result: songID })
            }
        })
        .catch(err => {
            // didnt insert 
            // delete inserted song
            res.send({
                statusCode: 500, result: songID
            })
        });
};

exports.getAllPlaylists = (req, res) => {
    var userID = mongoose.Types.ObjectId(req.params.userID)
    console.log(userID)
    Playlist.find({ ownerID: userID })
        .then(data => res.send({
            statusCode: 200,
            result: data
        }))
        .catch(err => {
            res.send({
                statusCode: 500,
                result: err.message || errMsg
            })
        });
};
// Create a playlist
exports.createPList = (req, res) => {

    const inserts = generateKeyValueFromBody(req.body)
    console.log(inserts)
    //console.log(inserts)
    Playlist.create(inserts)
        .then(data => {
            if (Boolean(data["_id"])) {
                res.send({ statusCode: 200, result: data["_id"] })
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
    // res.send(200)
};

//Edit title and description of Playlist
exports.editPlaylist = (req, res) => {
    const updates = generateKeyValueFromBody(req.body)
    var playListID = updates.playListID
    var ownerID = updates.ownerID

    delete updates.playListID
    delete updates.ownerID

    Playlist.updateOne({ _id: playListID, ownerID: ownerID }, { $set: updates })
        .then(data => {
            //console.log(data["nModified"])
            if (Boolean(data["nModified"])) {

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

exports.allPlaylists = (req, res) => {
    console.log("here")
    Playlist.find({ hidden: false })
        .then(data => {
            res.send({ statusCode: 200, result: data })
        })
        .catch(err => {
            res.send({ statusCode: 500, result: err })
        })
};

exports.addSongsPList = (req, res) => {
    var playListID = req.body.playListID
    var songid = req.body.songID
    var ownerID = req.body.ownerID

    Playlist.updateOne({ _id: playListID, ownerID: ownerID }, { "$push": { "songID": songid } })
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

exports.remSongsPList = (req, res) => {
    var playListID = req.body.playListID
    var songid = req.body.songID
    var ownerID = req.body.ownerID

    Playlist.updateOne({ _id: playListID, ownerID: ownerID }, { "$pull": { "songID": songid } })
        //.then(data=>res.send(data))
        .then(data => {
            if (Boolean(data["nModified"])) {
                res.send({
                    statusCode: 200, result: "true"
                })
            }
            else {
                // didnt insert 
                res.send({
                    statusCode: 400, result: "false"
                })
            }
        })
        .catch(err => {
            res.send({
                statusCode: 500, result: err.message || errMsg
            })
        });
};

exports.hidePList = (req, res) => {
    var playListID = req.body.playListID
    var hidden = req.body.hidden
    var ownerID = req.body.ownerID
    // playlst marked as "hidden:true" will not be visible in search
    Playlist.updateOne({ _id: playListID, ownerID: ownerID }, { $set: { hidden: hidden } })
        //.then(data=>res.send(data))
        .then(data => {
            if (Boolean(data["nModified"])) {
                res.send({ statusCode: 200, result: "true" })
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
};

exports.verifyEmail = (req, res) => {
    var ID = req.body.userID
    User.updateOne({ _id: ID }, { $set: { emailverified: true } })
        .then(data => {
            //console.log(data)
            if (Boolean(data["nModified"])) {
                res.status(200).send({ statusCode: 200, message: "true" })
            }
            else {
                // didnt modify 
                res.status(500).send({ statusCode: 500, message: "false" })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });
};

// get all songs ( no limit)
exports.getAllSongs = (req, res) => {
    Ratings.aggregate([
        {
            $group:
            {
                _id: "$songID",
                rating: { $avg: "$ratings" }
            }
        },
        {
            $lookup: {
                from: "Songs",
                localField: "_id",
                foreignField: "_id",
                as: "ratings_data"
            }
        },
        { $unwind: "$ratings_data" }
        ,
        {
            $project: {
                rating: { $round: ["$rating", 0] },
                _id: 1,
                genre: "$ratings_data.Genre",
                hidden: "$ratings_data.Hidden",
                name: "$ratings_data.Name",
                artist: "$ratings_data.Artist",
                album: "$ratings_data.Album",
                duration: "$ratings_data.Duration",
                year: "$ratings_data.Year",
                picture: "$ratings_data.Picture"
            }
        },
        {
            $sort: {
                rating: -1,
                name: 1
            }
        },
        {
            $match: {
                hidden: false
            }
        }
    ])
        //.limit(10)
        .then(songs => {
            if (songs != null) {
                res.send({ statusCode: 200, result: songs })
            }
            else {
                res.send({ statusCode: 300, result: songs })
            }

        })
        .catch(err => {
            res.send({
                statusCode: 500, result: err.message || errMsg
            })
        });

};

exports.deleteRating = (req, res) => {
    var rateId = req.body.rateID
    Ratings.deleteOne({ _id: rateId })
        .then(data => {
            if (Boolean(data["deletedCount"])) {
                res.send({
                    statusCode: 200, result: "true"
                })
            }
            else {
                // didnt insert 
                res.send({
                    statusCode: 500, result: "false"
                })
            }
        })
        .catch(err => {
            res.send({
                statusCode: 500, result: err.message || errMsg
            })
        });

};

exports.deleteSong = (req, res) => {
    var rateId = req.body.songID
    Songs.deleteOne({ _id: rateId })
        .then(data => {
            if (Boolean(data["deletedCount"])) {
                res.send({
                    statusCode: 200, result: "true"
                })
            }
            else {
                // didnt insert 
                res.send({
                    statusCode: 500, result: "false"
                })
            }
        })
        .catch(err => {
            res.send({
                statusCode: 500, result: err.message || errMsg
            })
        });

};

exports.test = (req, res) => {
    console.log(req.body.email)
    res.send("ss")
};