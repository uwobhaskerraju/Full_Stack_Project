var mongoose     = require('mongoose');

var SongsSchema   = mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    Name: { type: String, required: true },
    Artist:{ type: String, required: true },
    Album:{ type: String, required: true },
    Duration:{ type: Number, required: true },
    Year:{ type: String, required: true },
    Genre:{ type: String, default: "Filmi" },
    Hidden:{ type: Boolean, default: false },
    Picture:{ type: String, default: "default.jpg" }
}, {
    versionKey: false 
});

SongsSchema.index( { "$**": "text" } )

module.exports = mongoose.model('Songs', SongsSchema,'Songs');