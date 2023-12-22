const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collection = new Schema({
    speedToRevealChat: {
        type: Number
    },
    numberOfCoinsStart: {
        type: Number
    },
    earnCoinsEvery: {
        type: Number,
    },
    referFriend: {
        type: Number
    },
    dailyCollection: {
        type: Number,
    },
    watchVideo: {
        type: Number,
    },
    coin: {
        type: Number
    },
    point: {
        type: Number
    },
    text: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model("coin", collection)

