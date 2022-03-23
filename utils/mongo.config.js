const mongoose = require('mongoose');


module.exports = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connected to mongoDB')
    } catch (error) {
        console.log('error connecting to mongoDB', error.message)
        throw new Error(error.message)

    }

};