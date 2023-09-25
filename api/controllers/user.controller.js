const User = require("../models/user.model.js");
const createError = require("../utils/createError.js");

module.exports.deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User does not exist."));

    // if (req.userId !== JSON.stringify(user._id)) { // does not work
    // toString and not JSON.stringify()
    // user._id is an object (as seen in mongo)
    // console.log(req.userId); // is a string without quotes
    // console.log(user._id.toString()); // is a string without quotes
    // console.log(JSON.stringify(user._id)); // is a string with quotes

    if (req.userId !== user._id.toString())
        return next(createError(403, "You can delete only your account!"));
    
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted.");
};
    
module.exports.getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User does not exist."));

    res.status(200).send(user);
};