var mongoose     = require('mongoose');

var SongsSchema   = mongoose.Schema({
    name: String,
    ratings:Number,
    artists:String,
    album:String,
    duration:Number,
    year:Number,
    Genre:String,
    playlistid:[String],
    hidden:Boolean,
    picture:String
});

module.exports = mongoose.model('Songs', SongsSchema,'Songs');