const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const product = require("../models/productModel")
const inventorySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true
    },
    planBuy:{
        amount: {
            type: Number,
            required: true
        },
        percentage: {
            type: Number,
            required: true
        },
        planType: {
            type: String,
            required: true
        },
        risk: {
            type: String,
            required: true
        },
    },
   
    paymentStatus: {
        type: String,
        required: true,
        enum:["Pending","Failed","Success"]
    },

}, {
    timestamps: true
});
inventorySchema.plugin(mongoosePaginate)
inventorySchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('inventory', inventorySchema);
