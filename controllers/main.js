const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");

const login = async(req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequestError("Please provide a username and a password");
    }
    const id = new Date().getDate();
    //keep the .sign params small for smooth experience of user and never share password by this way.
    //normally use unguessable string values for secret
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res.status(200).json({ msg: "User Created", token });
};

const dashboard = async(req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello ${req.user.username}`,
        secret: `Here is your lucky number ${luckyNumber}`,
    });
};

module.exports = {
    login,
    dashboard,
};