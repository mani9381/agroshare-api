const mongoose = require('mongoose')

const users = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const usersModel = mongoose.model('users',users)

module.exports  = {
    usersModel
}