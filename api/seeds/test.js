const userData = require("./userData.json")
const gigData = require("./gigData.json")
    
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < gigData[i].title.length; j++) {
            console.log(gigData[i].title[j]),
            console.log(gigData[i].desc[j]),
            console.log("\n")
            // totalStars: randomNo(10, 190),
            // starNumber: randomNo(5, 45),
            // cat: gigData[i].category,
            // price: randomNo(2000, 18000),
            // cover: gigData[i].images[0],
            // images: [...gigData[i].images.slice(1)],
            // features: [...gigData[i].features],
            // sales: randomNo(100, 900)
        }
    }
    