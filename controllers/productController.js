const {productModel } = require('../models/product')
const {Types} = require('mongoose')


async function createProduct(req,res){
    try{
        let {name,description} = req.body
        let doc = new productModel({
            name:name,desacription:description,availability:true,owner:req.userDetails.id
        })
        await doc.save();
        return res.status(200).json({message:"product creadted"})

    }
    catch(err){
        return res.status(500).json({message:"Internal server error",err})
    }
}

async function getAllProducts(req,res){
    try{
        return res.status(200).json(await productModel.find({}))
    }
    catch(err){
        return res.status(500).json({message:"Internal server error",err})
    }
}

async function getProductById(req,res){
    try{
        let productId = req.params.id
        let product = await productModel.findById(productId)
        if(!product){
            return res.status(404).json({message:"Product not found that you are searching"})
        }
        return res.status(200).json(product)
    }
    catch(err){
        return res.status(500).json({message:"Internal server error",err})
    }
}

async function updateProductById(req,res){
    try{
        let productId = req.params.id
        let description = req.body.desacription
        let ack = await productModel.updateOne(
            {_id:Types.ObjectId(productId),owner:Types.ObjectId(req.userDetails.id)},
            {$set:{desacription:description}}
        )
        if(!ack){
            return res.status(204).json({message:"product not updated"})
        }
        return res.status(200).json({message:"Product updated successfully"})
    }
    catch(err){
        return res.status(500).json({message:"Internal server error",err})
    }
}

async function deleteProductById(){
    try{
        let productId = req.params.id
        let ack = await productModel.deleteOne(
            {_id:Types.ObjectId(productId),owner:Types.ObjectId(req.userDetails.id)}
        )
        if(!ack){
            return res.status(204).json({message:"product not deleted"})
        }
        return res.status(200).json({message:"Product deleted successfully"})

    }
    catch(err){
        return res.status(500).json({message:"Internal server error",err})
    }

}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
}