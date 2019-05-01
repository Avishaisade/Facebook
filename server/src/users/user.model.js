const mongoose = require('mongoose'); // mongoose

const User = mongoose.model('User', {
    firstName:{ 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    birthDate: { 
        type: Date, required: false 
    },
    avatarPic: { 
        type: String, 
        reqired: false 
    },
    coverPic: { 
        type: String, 
        reqired: false 
    },
    alernateName: { 
        type: String, 
        reqired: false 
    },
    registrationDate: { 
        type: Date, 
        default: Date.Now
    },
});


module.exports = {
    User,
};

