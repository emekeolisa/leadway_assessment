const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Token = require('../models/tokenModel');
const Mail = require('../helper/sendMail');
// const tokenSecretKey = require('crypto').randomBytes(32).toString('hex');
// console.log({ tokenSecretKey })



const newCont = {
    homePage: (req, res) => {
        res.render('index');
    },
    login: async(req, res) => {
        try {
            const { email, username, password } = req.body;
            const user = await User.findOne({ email } || { username });
            if (!user) return res.status(404).send("Username or Email not found, please register!")
            console.log({ user });
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === false) {
                return res.status(404).send("Email or password not correct");
                // console.log(isValid);
            }

            const tokenSecretKey = process.env.JWT_SECRET;

            const data = { _id: user._id };
            const tokenExpirationTime = process.env.JWT_EXPIRATION_TIME;

            const token = jwt.sign(data, tokenSecretKey, { expiresIn: tokenExpirationTime });
            console.log({ token });

            // return res.redirect('/user/library')

            return res.status(200).json({
                result: `welcome ${user.firstname}`,
                token
            });

        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message
            })
        }
        // res.render('signIn');
    },
    register: async(req, res) => {
        try {
            const { firstname, lastname, username, dateOfBirth, gender, email, profilePic, phoneNumber, password } = req.body;
            const salt = bcrypt.genSaltSync(10);
            console.log({ salt });

            const hashedPassword = await bcrypt.hash(password, salt);
            console.log(hashedPassword);




            const user = await User.create({
                firstname,
                lastname,
                username,
                dateOfBirth,
                gender,
                email,
                profilePic,
                phoneNumber,
                password: hashedPassword
            })
            console.log(user)


            const tokenSecretKey = process.env.JWT_SECRET;

            const data = { _id: user._id }
            const tokenExpirationTime = process.env.JWT_EXPIRATION_TIME;

            const token = jwt.sign(data, tokenSecretKey, { expiresIn: tokenExpirationTime });
            console.log({ token })


            if (!user) throw new Error('User not created');
            return res.status(200).json({ result: user, token })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: error.message
            })
        }
        console.log(req.body)
            // res.send('logged in successfully')
            // res.redirect('/user/library')
    },
    request_password_reset: async(req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(404).send("Email not found, please register!");
            const resetToken = crypto.randomBytes(28).toString('hex');
            console.log(resetToken);
            const hash = await bcrypt.hash(resetToken, 10);

            await Token.create({
                userId: user._id,
                token: hash
            });


            const url = `http://localhost:5000/reset_password/?userId=${user.id}&resetToken=${resetToken}`;
            // Send Reset Password url to user
            await Mail(
                email,
                'Reset Password',
                `<a href="${url}">Reset Password</a>`,
            );

            return res.status(200).json({ result: 'Email Sent' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }


    },
    reset_password: async(req, res) => {
        try {
            const { userId, resetToken, password } = req.body;

            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ result: 'User Not Found' });

            const token = await Token.findOne({ userId });
            if (!token) return res.status(404).json({ result: 'Token Not Found' });

            const isValid = await bcrypt.compare(resetToken, token.token);
            if (!isValid) return res.status(404).json({ result: 'Token Not Valid or Expired' });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user.password = hashedPassword;
            await user.save();

            // Delete Token
            token.remove();

            return res.status(200).json({ result: 'Password Reset Successfully' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    upload: async(req, res) => {
        console.log(req.file);
    },


}


module.exports = newCont