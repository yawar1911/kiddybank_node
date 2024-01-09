
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const walletSchema =  mongoose.Schema({
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
    inventoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    dailyIncome: {
        type: Number,
        required: true
    },
    totalIncome: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: false
    },
    balance: {
        type: Number,
        default: 0,
        required: true,
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction',
        },
    ], 
  
   
   
}, {
    timestamps: true
});
walletSchema.plugin(mongoosePaginate)
walletSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('wallet', walletSchema);
