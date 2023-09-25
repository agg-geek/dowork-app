const createError = require("../utils/createError.js");
const Order = require("../models/order.model.js");
const Gig = require("../models/gig.model.js");
const Stripe = require("stripe");

// not sure is required
// const dotenv = require("dotenv");
// dotenv.config();

module.exports.intent = async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE_TEST_KEY);

    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Cannot create order for gig that does not exist"));

    const paymentIntent = await stripe.paymentIntents.create({
        // amount: gig.price * 100; // 100 to convert to $ from cents
        amount: gig.price,
        currency: "inr",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    const newOrder = new Order({
        gigId: gig._id,
        img: gig.cover,
        title: gig.title,
        buyerId: req.userId,
        sellerId: gig.userId,
        price: gig.price,
        payment_intent: paymentIntent.id,
    });

    await newOrder.save();

    res.status(200).send({ clientSecret: paymentIntent.client_secret });
};

module.exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
            // isCompleted should be true
            // because only orders with completed payment should be shown
            isCompleted: true,
        });

        res.status(200).send(orders);
    } catch (err) {
        next(err);
    }
};
module.exports.confirm = async (req, res, next) => {
    try {
        const orders = await Order.findOneAndUpdate(
            { payment_intent: req.body.payment_intent, },
            { $set: { isCompleted: true, }, }
        );

        res.status(200).send("Order has been confirmed.");
    } catch (err) {
        next(err);
    }
};