const nodeMailer = require('nodemailer');
// const mailgun = require("mailgun-js");
// const mg = require("nodemailer-mailgun-transport");


module.exports = (email, subject, message) => {
    try {
        const transporter = nodeMailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.user,
                    pass: process.env.pass
                }
            }

        );



        const mailOptions = {
            from: "emekeolisa@gmail.com",
            to: email,
            subject,
            text: message
        };


        const isSent = transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log({ err });
            console.log('Message sent: %s', info);
        });

        console.log({ isSent });
        return isSent;
    } catch (error) {
        console.log({ errorMail: error.message });
        return `${error}`;
    }

};