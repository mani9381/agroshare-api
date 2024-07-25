const  mongoose = require('mongoose')
const {rentalModel} = require('../models/rentproduct')
const {productModel} = require('../models/product')

async function sendRequest(req,res){
    try{
        
        let request = await rentalModel.findOne(
            {owner:mongoose.Schema.Types.ObjectId( req.body.owner),needed:mongoose.Schema.Types.ObjectId(req.userDetails.id),productId:mongoose.Schema.Types.ObjectId(req.params.id)}
        )
        if(request){
            return res.status(200).json({message:"Request already exist"})
        }
        let doc = new rentalModel({
            owner:req.body.owner, needed:req.userDetails.id, productId:req.params.id,status:'Requested'
        })
        await doc.save();
        return res.status(200).json({message:"Request is sent to respected owner"})

    }
    catch(err){
        return res.status(500).json({err,message:"Internal server error"})
    }

}

async function getMyRequests(req,res){
    try{
        let myrequests = await rentalModel.find({owner:mongoose.Schema.Types.ObjectId(req.userDetails.id)})
        return res.status(200).json(myrequests)
    }
    catch(err){
        return res.status(500).json({err,message:"Internal server error"})
    }
}

async function getMySentRequests(req,res){
    try{
        let myrequests = await rentalModel.find({needed:mongoose.Schema.Types.ObjectId(req.userDetails.id)})
        return res.status(200).json(myrequests)

    }
    catch(err){
        return res.status(500).json({err,message:"Internal server error"})
    }
}

async function acceptRequest(req,res){
    const session = await mongoose.startSession();
    
    try{
        let {needed} = req.body;
        session.startTransaction();
        await rentalModel.updateOne(
            {owner:mongoose.Schema.Types.ObjectId(req.userDetails.id),needed:mongoose.Schema.Types.ObjectId(needed),productId:mongoose.Schema.Types.ObjectId(req.params.id)},
            {$set:{status:"Accepted"}},
            {session}
        )
        await productModel.findByIdAndUpdate(req.params.id,{$set:{availability:false}},{session})
        await session.commitTransaction()
        return res.status(200).json({message:"Requeste accepeted"})

    }
    catch(err){
        await session.abortTransaction()
        return res.status(500).json({err,message:"Internal server error"})
    }
    finally{
        session.endSession()
    }
}

async function rejectRequest(req,res){
    
    
    try{
        let {needed} = req.body;
       
        await rentalModel.updateOne(
            {owner:mongoose.Schema.Types.ObjectId(req.userDetails.id),needed:mongoose.Schema.Types.ObjectId(needed),productId:mongoose.Schema.Types.ObjectId(req.params.id)},
            {$set:{status:"Rejected"}}
        )        
        return res.status(200).json({message:"Requeste Rejected"})

    }
    catch(err){
        await session.abortTransaction()
        return res.status(500).json({err,message:"Internal server error"})
    }
}



module.exports = {
    sendRequest,
    getMyRequests,
    getMySentRequests,
    acceptRequest,
    rejectRequest
    
}