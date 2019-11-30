var mongoose     = require('mongoose');

var SongsSchema   = mongoose.Schema({
    Name: { type: String, required: true },
    Artist:{ type: String, required: true },
    Album:{ type: String, required: true },
    Duration:{ type: Number, required: true },
    Year:{ type: Number, required: true },
    Genre:{ type: String, default: "Filmi" },
    Hidden:{ type: Boolean, default: false },
    Picture:{ type: String, required: true }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('Songs', SongsSchema,'Songs');