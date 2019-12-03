const Songs = require('../models/song.model.js');
const reviews = require('../models/review.model.js');
const Ratings = require('../models/ratings.model.js');
const errMsg = "something went wrong! try again"

exports.getTopTenSongs = (req, res) => {

    Ratings.aggregate([
        {
            $lookup: {
                from: "Songs",
                localField: "songID",
                foreignField: "_id",
                as: "ratings_data"
            }
        }
        // ,
        // {
        //     $project:{
        //         songID:1,
        //         rating:{$avg:"$ratings"}
        //     }
        // }
        // ,
        // {
        //     $group: {
        //         _id: "$songID",
        //         rating: { $avg: "$ratings" }
        //     }
        // }
    ])
        .then(songs => {
            res.send(songs)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || errMsg
            })
        });

};
exports.search = (req, res) => {
    var q=req.params.query
    console.log(q)
    //Songs.find( { Name: { $regex: q } } )
    Songs.find({$or:[
        {Name:{'$regex':q,'$options': 'i'}},
        {Album:{'$regex':q,'$options': 'i'}},
        {Artist:{'$regex':q,'$options': 'i'}},
        {Year:{'$regex':q,'$options': 'i'}},
        {Genre:{'$regex':q,'$options': 'i'}}
    ]
})
    .then(data=>{
        res.json(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || errMsg
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