var mongoose     = require('mongoose');

var ReviewSchema   = mongoose.Schema({
    songId: String,
    comment:String,
    reviewBy:String
});

module.exports = mongoose.model('Review', ReviewSchema,'Reviews');