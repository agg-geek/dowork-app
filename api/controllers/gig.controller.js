const Gig = require("../models/gig.model.js");
const createError = require("../utils/createError.js");

module.exports.createGig = async (req, res, next) => {
    if (!req.isSeller)
        return next(createError(403, "Only sellers can create a gig!"));

    const newGig = new Gig({
        ...req.body,
        // req.userId comes due to the json web token 
        // information stored during login
        // note that on login, the user information is not stored directly
        // the user needs to make some action first
        // and only after the action happens
        // the actual req.userId is created during verifyToken
        // and as you use verifyToken before you do anything
        // the below function works
        userId: req.userId,
    });

    try {
        const savedGig = await newGig.save();
        res.status(201).json(savedGig);
    } catch (err) {
        next(err);
    }
};

// get a single gig 
module.exports.getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) return next(createError(404, "Gig not found."));
        res.status(200).send(gig);
    } catch (err) {
        next(err);
    }
};

// get all  gigs according to chosen filters
// sellerId
// cat: design, ai
// price: min, max 
// search: <any search term>
// sort: best selling, newest (done separately)
module.exports.getGigs = async (req, res, next) => {
    const q = req.query;
    const filters = {
        // note that userId comes from the gig model
        ...(q.userId && { userId: q.userId }),
        ...(q.cat && { cat: q.cat }),
        ...((q.min || q.max) && {
            price: {
                ...(q.min && { $gt: q.min }),
                ...(q.max && { $lt: q.max }),
            },
        }),
        // $options: "i" makes it insensitive to lowercase and uppercase
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };
    try {
        // q.sort is either createdAt or <update this placeholder>
        // you can also set price: -1 though using ?sort=price
        const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
        res.status(200).send(gigs);
    } catch (err) {
        next(err);
    }
};

module.exports.deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) return next(createError(404, "Gig not found."));

        if (gig.userId !== req.userId)
            return next(createError(403, "You can delete only your gig!"));

        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).send("Gig has been deleted!");
    } catch (err) {
        next(err);
    }
};

