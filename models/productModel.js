const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
// const mongoosePaginate = require('mongoose-paginate-v2');
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
    description:{
        type: String,
        required: true 
    },
    monthly:{
        type: Number,
         required:true
    },
    totalDays:{
        type: Number,
         required:true
    },
    planType:{
        type:String,
        required:true,
        enum:["Short term","Long term","Mid term",
        "Double money","Women saving","New baby born"
        ] 
    },
    risk:{
        type:String,
        required:true,
        enum:["Low risk","Medium risk", "High risk"] 
    },
    // planType: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'category',
    //     required: true,
    //   },
}, {
    timestamps: true
});
productSchema.plugin(mongoosePaginate)
productSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('product', productSchema);
