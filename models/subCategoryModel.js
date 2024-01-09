var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var subCategory = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: false,
    },
    subcategoryName: {
        type: String,
        required: true
    },
   
},
    {
        timestamps: true
    })
subCategory.plugin(mongoosePaginate)
subCategory.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('subCategory', subCategory);