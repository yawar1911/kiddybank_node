var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var category = mongoose.Schema({

    categoryName: {
        type: String,
        required: true
    },
   
   
},
    {
        timestamps: true
    })
category.plugin(mongoosePaginate)
category.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('category', category);