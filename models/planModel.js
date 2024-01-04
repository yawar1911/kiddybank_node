var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var plan = mongoose.Schema({

    planName: {
        type: String,
        required: true
    },
   
},
    {
        timestamps: true
    })
plan.plugin(mongoosePaginate)
plan.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('plans', plan);