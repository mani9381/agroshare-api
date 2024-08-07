const jwt = require('jsonwebtoken')
const {usersModel} = require('../models/users')
const bcrypt = require('bcrypt')

async function login(req,res){
    try{
        let {email,password} = req.body;
        let user = await usersModel.findOne({email})
        if(!user){
            return res.status(200).json({auth:false,message:"Account not exist with this email address"})
        }
        let comapre = await bcrypt.compare(password,user.password)
        if(!comapre){
            return res.status(200).json({auth:false,message:"Incorrect Password"})

        }
        let payload = {
            user:{
                id:user._id,
                email:user.email
            }
        }

        let token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:'10h'})

        return res.status(200).json({auth:true,message:"Login successfull",token})
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
            return res.status(200).json({message:"User already exists with this email"})
        }
        let passwordHash =await bcrypt.hash(password,10)
        let doc = new usersModel({
            email,password:passwordHash,name
        })
        await doc.save()
        return res.status(200).json({message:"User registered success"})

    }
    catch(err){
        return res.status(500).json({err,message:"Internal server error"})
    }
}

async function profile(req,res){
    try{
        return res.status(200).json(await usersModel.findOne({email:req.userDetails.email}))
    }
    catch(err){
        return res.status(500).json({err,message:"Internal server error"})
    }
}


module.exports = {
    login,
    register,
    profile
}