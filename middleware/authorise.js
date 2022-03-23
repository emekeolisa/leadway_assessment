const jwt = require('jsonwebtoken');


module.exports = async(req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(400).json({ result: "You need to sign-up or sign-in" })
    console.log({ header });
    const token = header.split(' ')[1];
    console.log({ token });


    const userVerified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userVerified;
    next();
    console.log(userVerified);
}