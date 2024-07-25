const { Types } = require('mongoose')
const {rentalModel} = require('../models/rentproduct')

async function sendRequest(req,res){
    try{
        
        let request = await rentalModel.findOne({owner:Types.ObjectId( req.body.owner),needed:Types.ObjectId(req.userDetails.id),productId:Types.ObjectId(req.params.id)})
        if(request){
            return res.status(200).json({message:"Request already exist"})
        }
        return res.status(200).json({message:"Request is sent to respected owner"})

    }
    catch(err){
        return res.status(500).json({err,message:"Internal server error"})
    }

}



module.exports = {
    sendRequest
}