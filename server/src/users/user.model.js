const mongoose = require('mongoose'); // mongoose

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: false },
    avatarPic: { type: String, reqired: false },
    coverPic: { type: String, reqired: false },
    registrationDate: { type: Date, default: Date.Now }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
};