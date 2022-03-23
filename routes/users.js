const express = require('express');
const router = express.Router();
const leadwayAPI = require('../controllers/leadwayAPI');
const auth = require('../middleware/authorise');
const upload = require('../middleware/uploadpic');




// here we create the user loging and signup page
router.use('/login', leadwayAPI.login);
router.use('/register', upload.single('image'), leadwayAPI.register);
// router.post('/upload', upload.single('image'), leadwayAPI.upload);
router.use('/request_reset', leadwayAPI.request_password_reset);
router.post('/reset_password', leadwayAPI.reset_password);





// this is where we export the module we have created


module.exports = router