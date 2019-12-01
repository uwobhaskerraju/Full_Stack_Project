var mongoose     = require('mongoose');

var ReviewSchema   = mongoose.Schema({
    songID: { type: mongoose.Schema.ObjectId, required: true },
    userName:{ type: String, required: true },
    ratings:{ type: Number, required: true }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('Ratings', ReviewSchema,'Ratings');