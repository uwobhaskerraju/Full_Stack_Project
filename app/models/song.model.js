var mongoose     = require('mongoose');

var SongsSchema   = mongoose.Schema({
    Name: String,
    Ratings:Number,
    Artist:String,
    Album:String,
    Duration:Number,
    Year:Number,
    Genre:String,
    PlaylistID:[String],
    Hidden:{ type: Boolean, default: false },
    Picture:String
});

module.exports = mongoose.model('Songs', SongsSchema,'Songs');