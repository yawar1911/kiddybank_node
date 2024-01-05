const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const inventorySchema =  mongoose.Schema({
    productId:{
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
    image:{
        type: String,
        required: false 
    },
  
    montly: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true 
    },
    planType:{
        type:String,
        required:true,
        enum:["Short term","Long term","Mid term",
        "Double money","Women saving","New baby born"
        ] // short term and long term plan 
    }
    // planType: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Plan',
    //     required: true,
    //   },
}, {
    timestamps: true
});
inventorySchema.plugin(mongoosePaginate)
inventorySchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('inventory', inventorySchema);
