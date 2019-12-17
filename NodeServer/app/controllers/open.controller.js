const Songs = require('../models/song.model.js');
const reviews = require('../models/review.model.js');
const Ratings = require('../models/ratings.model.js');
const errMsg = "something went wrong! try again"
const mongoose = require('mongoose');
var dice = require('dice-coefficient')


exports.getTopTenSongs = (req, res) => {

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
        { $unwind: "$ratings_data" },
        // {
        //     rating: { $round: ["$rating", 0] }
        // },
        {
            $project: {
                rating: { $floor: "$rating" },
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
            $match:{
                hidden:false
            }
        }
    ])
        .limit(10)
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
exports.search = (req, res) => {
    var q = req.params.query
    var threshold = 0.25// for filtering
    console.log(q)
    //Songs.find( { Name: { $regex: q } } )
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
        { $unwind: "$ratings_data" },
        // {
        //     rating: { $round: ["$rating", 0] }
        // },
        {
            $project: {
                rating: { $floor: "$rating" },
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
        }
        ,
        {
            $match:{
                hidden:false
            }
        }
        
    ])
        .limit(10)
        .then(data => {
            var fnlJson = []
            data.forEach(d => {
                Object.keys(d).forEach(function (key) {
                    // console.table('Key : ' + key + ', Value : ' + d[key])
                    if (dice(String(d[key]).toLowerCase(), String(q).toLowerCase()) >= threshold) {
                        fnlJson.push(d)
                    }
                })
                //return false
                //console.log("next loop")
            })
            fnlJson = [...new Set(fnlJson)];
            res.send({ statusCode: 200, result: fnlJson })
        })
        .catch(err => {
            res.send({
                statusCode: 500, result: err.message || errMsg
            })
        });
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
        .select('-_id')
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
    var songID = mongoose.Types.ObjectId(req.params.songID)
    reviews.aggregate([
        {
            $match: { songId: songID }
        }
        ,
        {
            $lookup:
            {
                from: "Ratings",
                let: { review_songID: "$songId", review_userID: "$userId" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $and:
                                    [
                                        { $eq: ["$songID", "$$review_songID"] },
                                        { $eq: ["$$review_userID", "$userID"] }
                                    ]
                            }
                        }
                    }
                ],
                as: "ratings_data"
            }
        }
        ,
        { $unwind: "$ratings_data" }
        ,
        {
            $project: {
                _id: 1,
                songId: 1,
                comment: 1,
                reviewBy: 1,
                userId: 1,
                rating: { $floor: "$ratings_data.ratings" }
            }
        }
    ]).then(songs => {
        res.send({ statusCode: 200, result: songs })
    })
        .catch(err => {
            res.send({
                statusCode: 500, result: err.message || errMsg
            })
        });
};

