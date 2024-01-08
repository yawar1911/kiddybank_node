var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var subCategory = mongoose.Schema({

    subCategoryName: {
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