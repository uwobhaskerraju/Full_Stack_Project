const Songs = require('../models/song.model.js');
const reviews = require('../models/review.model.js');
const Ratings = require('../models/ratings.model.js');
const errMsg = "something went wrong! try again"

exports.getTopTenSongs = (req, res) => {
    //console.log("inside getTopTenSongs")
    Songs.find({ Ratings: { $gte: 3 }, Hidden: false })
        .limit(10)
        .then(songs => {
            res.send(songs)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });

};
exports.autoFill = (req, res) => {

};

exports.getRating = (req, res) => {
    // assuming only not hidden songIDs come here
    var songId = req.params.songID
    Ratings.aggregate([
        { $match: { "songID": songId } },
        {
            $group: {
                _id: null,
                average: {
                    $avg: "$ratings"
                }
            }
        }
    ])
        .then(songs => {
            res.send({ message: songs[0]["average"] })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });
};

exports.getSong = (req, res) => {

    var songID = req.params.songID
    Songs.find({ _id: songID, Hidden: false })
        .then(songs => {
            res.send(songs)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });
};
exports.getReview = (req, res) => {
    // assuming only not hidden songIDs come here
    var songID = req.params.songID

    reviews.find({ songId: songID })
        .then(reviews => {
            res.send(reviews)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });
};