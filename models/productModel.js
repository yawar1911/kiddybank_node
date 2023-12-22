const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
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
        type: String,
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
    planType:{
        type:String,
        required:true,
        enum:["shortTermPlan","longTermPlan"] // short term and long term plan 
    }
});
const Product = mongoose.model('product', productSchema);

module.exports = Product;
