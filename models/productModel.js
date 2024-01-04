const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const productSchema =  mongoose.Schema({
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
        enum:["Short term","Long term","Mid",
        "Double money","Women saving","New baby born"
        ] // short term and long term plan 
    }
}, {
    timestamps: true
});
productSchema.plugin(mongoosePaginate)
productSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('product', productSchema);
