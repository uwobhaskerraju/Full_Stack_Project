var mongoose = require('mongoose');

var RatingSchema = mongoose.Schema({
    songID: { type: mongoose.Schema.ObjectId, required: true },
    userName: { type: String, required: true },
    ratings: { type: Number, required: true },
    userID: { type: mongoose.Schema.ObjectId, required: true }
}, {
    versionKey: false
});

module.exports = mongoose.model('Ratings', RatingSchema, 'Ratings');