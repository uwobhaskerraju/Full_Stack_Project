var mongoose = require('mongoose');

var PlaylistSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    ownerID: { type: mongoose.Schema.ObjectId, required: true },
    songID: { type: [mongoose.Schema.ObjectId], default:[] },
    hidden: { type: Boolean, default: true }
}, {
    versionKey: false
});

module.exports = mongoose.model('Playlists', PlaylistSchema, 'Playlists');