const Songs = require('../models/song.model.js');

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