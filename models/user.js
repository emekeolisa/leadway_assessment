const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const signInSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    profilePic: {
        type: String
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
})



module.exports = mongoose.model('User', signInSchema);