const express = require('express');
const bodyParser = require('body-parser');
const videoController = require('./controllers/leadwayAPI');
const fs = require('fs');
const path = require('path')
const mongoose = require('mongoose')
const mongoConnect = require('./utils/mongo.config')

require('dotenv').config()
const { PORT, BASE_URL } = process.env




const app = express();



app.set('view engine', 'ejs')

// we use this line of code to invoke body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));

// we use this line of code parse application/jason
app.use(bodyParser.json());



app.use('/user', require('./routes/users'));
// app.use('/user', require('./routes/account'));


app.use('/', videoController.homePage);








app.listen(PORT, async() => {
    await mongoConnect();
    console.log('server is now running on 5000')
});