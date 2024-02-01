const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
// const mongoosePaginate = require('mongoose-paginate-v2');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const productSchema =  mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {  // add customer price plan
        type: Number,
        required: true
    },
    dailyIncome: {  // daily income
        type: Number,
        required: true
    },
    totalIncome: {   // total income benefit
        type: Number,
        required: true
    },
    percentage: {   // perecntage acc. to risk  plan
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
    totalDays:{   // total days plan
        type: Number,
         required:true
    },
    planType:{   // types of plan
        type:String,
        required:true,
        enum:["Short term","Long term","Mid term",
        "Women saving","New baby born"
        ] 
    },
    risk:{   // risk add
        type:String,
        required:true,
        enum:["Low risk","Secure risk", "High risk","Full profit","Steady growth","Substantial return","High rewards","Maximum growth"] 
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
