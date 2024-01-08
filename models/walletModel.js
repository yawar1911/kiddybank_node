
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const productSchema =  mongoose.Schema({
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
  
   
   
}, {
    timestamps: true
});
productSchema.plugin(mongoosePaginate)
productSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('product', productSchema);
