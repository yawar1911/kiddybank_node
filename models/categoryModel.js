var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var category = mongoose.Schema({

    categoryName: {
        type: String,
        required: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory',
        required: false,
    },
   
},
    {
        timestamps: true
    })
category.plugin(mongoosePaginate)
category.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('category', category);