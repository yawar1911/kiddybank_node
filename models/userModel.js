var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var User = mongoose.Schema({

    jwtToken: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    mobile: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    })
User.plugin(mongoosePaginate)
User.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('users', User);