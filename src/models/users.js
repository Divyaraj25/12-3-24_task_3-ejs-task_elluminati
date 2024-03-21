const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase:true,
        required: true
    },
    email: {
        type: String,
        lowercase:true,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true,
        unique: true
    },
    path: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model('users', userSchema)