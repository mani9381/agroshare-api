const mongoose = require('mongoose')

let rental = new mongoose.Schema({
    owner:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    needed:{
        type : mongoose.Types.ObjectId,
        required:true
    },
    productId : {
        type: mongoose.Types.ObjectId,
        ref : 'products'
    },
    status:{
        type:String,
        require:true
    } 
},{timestamps:true})

let rentalModel = mongoose.model('requets',rental)

module.exports = {
    rentalModel
}