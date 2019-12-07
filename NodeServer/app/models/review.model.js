var mongoose     = require('mongoose');

var ReviewSchema   = mongoose.Schema({
    songId: { type: mongoose.Schema.ObjectId, required: true },
    comment:{ type: String, required: true },
    reviewBy:{ type: String, required: true }
}, {
    versionKey: false 
});

module.exports = mongoose.model('Review', ReviewSchema,'Reviews');