const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const tokenSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
})



module.exports = mongoose.model('Token', tokenSchema);