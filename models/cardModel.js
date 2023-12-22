const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema({
    bankAcount: {
        type: Number,
        required: true
    },
    accountHolder: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    }
});
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
