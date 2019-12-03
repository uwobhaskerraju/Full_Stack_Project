var mongoose     = require('mongoose');

var ReviewSchema   = mongoose.Schema({
    songId: { type: String, required: true },
    comment:{ type: String, required: true },
    reviewBy:{ type: String, required: true }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('Review', ReviewSchema,'Reviews');