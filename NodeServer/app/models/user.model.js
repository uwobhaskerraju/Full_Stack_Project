var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailverified: { type: Boolean, default: false },
    active:{type:Boolean,default:false},
    usertype: { type: String, default: "user" },
    signupmethod: { type: String, required: true }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('User', UserSchema, 'User');