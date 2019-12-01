var mongoose = require('mongoose');

var PlaylistSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    ownerID: { type: mongoose.Schema.ObjectId, required: true },
    songID: { type: [mongoose.Schema.ObjectId], required: true },
    hidden: { type: Boolean, default: false }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('Playlists', PlaylistSchema, 'Playlists');