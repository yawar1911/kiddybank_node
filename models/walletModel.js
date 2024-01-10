
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
    productName: {
        type: String,
        required: true
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
    monthly:{
        type: Number,
         required:true
    },
    totalDays:{
        type: Number,
         required:true
    },
    risk:{
        type:String,
        required:true,
        enum:["Low risk","Medium risk", "High risk"] 
    },
    transactions: {
        type: String,
        required: true
    },
    // balance: {
    //     type: Number,
    //     default: 0,
    //     required: true,
    // },
    // transactions: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Transaction',
    //     },
    // ], 
  
   
   
}, {
    timestamps: true
});
walletSchema.plugin(mongoosePaginate)
walletSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('wallet', walletSchema);
