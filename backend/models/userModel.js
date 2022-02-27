const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    website: {
        type: String,
        required: [true, 'Please add a website']
    },
    roles: [{
        type: String,
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
},
{
    timestamps: true
})


module.exports = mongoose.model('User', userSchema)
