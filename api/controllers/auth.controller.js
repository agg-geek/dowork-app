const User = require("../models/user.model.js");
const createError = require("../utils/createError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 12);
        const newUser = new User({
            ...req.body,
            password: hash,
        });
        
        await newUser.save();

        const token = jwt.sign(
            {
                id: newUser._id,
                isSeller: newUser.isSeller,
            },
            process.env.SECRET_KEY
        );

        const { password, ...info } = newUser._doc;
        // res.status(201).send("User has been created.");
        res
            .cookie("accessToken", token, {
                httpOnly: true,
            })
            .status(200)
            .send(info);
    } catch (err) {
        next(err);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user)
            return next(createError(401, "Wrong username or password!"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect)
            return next(createError(401, "Wrong username or password!"));

        const token = jwt.sign(
            {
                id: user._id,
                isSeller: user.isSeller,
            },
            process.env.SECRET_KEY
        );

        const { password, ...info } = user._doc;
        res
            .cookie("accessToken", token, {
                httpOnly: true,
            })
            .status(200)
            .send(info);
    } catch (err) {
        next(err);
    }
};

module.exports.logout = async (req, res) => {
    res
        .clearCookie("accessToken", {
            sameSite: "none",
            secure: true,
        })
        .status(200)
        .send("User has been logged out.");
};