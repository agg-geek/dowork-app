const createError = require("../utils/createError.js");
const Conversation = require("../models/conversation.model.js");

module.exports.createConversation = async (req, res, next) => {
    const newConversation = new Conversation({
        // the id is combination of sellerId + buyerId
        // accordingly decide the id here
        // where does req.body.to come from?
        id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
        sellerId: req.isSeller ? req.userId : req.body.to,
        buyerId: req.isSeller ? req.body.to : req.userId,
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller,
        // last message in conversation model is ignored as required: false
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(201).send(savedConversation);
    } catch (err) {
        next(err);
    }
};

// get the (single) conversation between seller and buyer
module.exports.getSingleConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.findOne({ id: req.params.id });
        if (!conversation) return next(createError(404, "Not found!"));
        res.status(200).send(conversation);
    } catch (err) {
        next(err);
    }
};

// get all conversations of a person with all other people
module.exports.getConversations = async (req, res, next) => {
    try {
        const conversations = await Conversation.find(
            req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
        ).sort({ updatedAt: -1 });
        res.status(200).send(conversations);
    } catch (err) {
        next(err);
    }
}

// updating if the conversation has been read by the other person
module.exports.updateConversation = async (req, res, next) => {
    try {
        const updatedConversation = await Conversation.findOneAndUpdate(
            { id: req.params.id },
            {
                $set: {
                    // make both readBySeller and buyer true
                    // as the person who messages, for him it was already true
                    // and now the other person has also read it
                    // (that's why the conversation is begin updated)
                    // so make the other person's readBy also true
                    ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
                },
            },
            { new: true }
        );

        res.status(200).send(updatedConversation);
    } catch (err) {
        next(err);
    }
};