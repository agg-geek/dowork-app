const mongoose = require("mongoose");
const userData = require("./userData.json")
const gigData = require("./gigData.json")
const User = require("../models/user.model")
const Gig = require("../models/gig.model")
const dotenv = require("dotenv");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

mongoose.set("strictQuery", true); // as per warning

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useCreateIndex: true,
	})
	.then(() => console.log("MongoDB connection successful"))
	.catch((err) => { console.error(err); });

// const categories = [
//     "animation",
//     "webdesign",
//     "graphicdesign",
//     "dataentry",
//     "ai",
//     "translation",
//     "social",
//     "seo",
//     "voiceover",
//     "bookcover",
// ]

const randomNo = (min, range) => Math.floor(Math.random() * range) + min;
const randomElementfromArray = array => array[Math.floor(Math.random() * array.length)];

const seedUsers = async () => {
    await User.deleteMany({});

    let totalUsersToSeed = 10;
    let usersToMakeSeller = 3;
    for (let i = 0; i < totalUsersToSeed; i++) {
        const user = new User({
            name: userData[i].name,
            username: `u${i+1}`,
            email: userData[i].email,
            password: `u${i+1}`,
            country: "India",
            phone: userData[i].phonenumber,
            desc: userData[i].desc,
            isSeller: (i < usersToMakeSeller ? true: false)
        })
        await user.save();
    }
}

const sellerId = [];
const populateSellerId = async () => {
    const sellers = await User.find({ isSeller: true });
    for (let i = 0; i < sellers.length; i++) {
        const id = sellers[i]._id.toString();
        sellerId.push(id);
    }
}

const seedGigs = async () => {
    await Gig.deleteMany({});
    
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < gigData[i].title.length; j++) {
            // let totalStars = randomNo(10, 190);
            // let starNumber = randomNo(5, 45);
            // let price = randomNo(2000, 18000);
            // let sales = randomNo(100, 900);
            
            const gig = new Gig({
                userId: randomElementfromArray(sellerId),
                title: gigData[i].title[j],
                desc: gigData[i].desc[j],
                totalStars: randomNo(10, 190),
                starNumber: randomNo(5, 45),
                cat: gigData[i].category,
                price: randomNo(2000, 18000),
                cover: gigData[i].images[0],
                images: [...gigData[i].images],
                features: [...gigData[i].features],
                sales: randomNo(100, 900)
            })
            await gig.save();
        }
    }
}
    
const seedDB = async () => {
    // seedUsers().then(() => console.log("Users created succesfully."));
    // populateSellerId().then(() => { console.log("Populated sellers array succesfully.")});
    // seedGigs().then(() => console.log("Gigs created successfully."));
    await seedUsers();
    await populateSellerId();
    await seedGigs();
}

seedDB().then(() => {
    mongoose.connection.close();
})
