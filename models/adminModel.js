const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const find = require('./../query/find')
let collection = new Schema({
    name: {
        type: String
    }, 
    email: {
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    token: {
        type: String,
        default: ''
    },
    profilePic: {
        type: String,
        default: 'https://res.cloudinary.com/dlopkjzfr/image/upload/v1580813623/qtjpwprowb6mouuqmyjp.png'
    },
    role:{
        type:String,
        default:"Admin"
    }
})
module.exports = mongoose.model("admins", collection)
