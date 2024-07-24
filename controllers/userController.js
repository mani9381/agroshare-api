const {usersModel} = require('../models/users')

async function login(req,res){
    try{
        let {email,password} = req.body;
        let user = await usersModel.findOne({email,password})
        if(!user){
            return res.status(401).json({auth:false,message:"wrong crendtials"})
        }
        return res.status(200).json({auth:true,message:"Login successfull"})
    }
    catch(err){
        return res.status(500).json({err,message:"Internal server error"})
    }
}

async function register(req,res){
    try{
        let {email,name, password} = req.body
        let user = await usersModel.findOne({email})
        if(user){
            return res.status().json({message:"User already exists with this email"})
        }
        let doc = new usersModel({
            email,password,name
        })
        await doc.save()
        return res.status(200).json({message:"User registered success"})

    }
    catch(err){
        return res.status(500).json({err,message:"Internal server error"})
    }
}


module.exports = {
    login,
    register
}