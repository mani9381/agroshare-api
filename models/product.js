const mongoose = require('mongoose')

let products = new mongoose.Schema({
    owner:{
        type: mongoose.Types.ObjectId,
        ref : "users",
    },
    name:{
        type:String,
        required:true
    },
    desacription:{
        type:String,
        required:true
    },
    availability:{
        type:Boolean,
        required:true
    }
})

let productModel = mongoose.model('products',products)

module.exports = {
    productModel
}