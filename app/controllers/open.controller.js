const Songs = require('../models/song.model.js');
const reviews = require('../models/review.model.js');

exports.getTopTenSongs = (req, res) => {
    //console.log("inside getTopTenSongs")
    Songs.find({ Ratings: { $gte: 3 } })
        .limit(10)
        .then(songs => {
            res.send(songs)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            })
        });

};
exports.autoFill = (req, res) => {

};

exports.getSong=(req,res)=>{

    var songID=req.params.songID
    Songs.find({ _id: songID })
        .then(songs => {
            res.send(songs)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            })
        });
};
exports.getReview = (req, res) => {
    var songID = req.params.songID

    reviews.find({ songId: songID })
        .then(reviews => {
            res.send(reviews)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            })
        });
};