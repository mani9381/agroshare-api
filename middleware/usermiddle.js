const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    try{
        let token = req.headers.token;
        if(!token){
            return res.status(401).json({message:"Unauthrized access"})
        }
        let data = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.userDetails = data.user
        next()

    }
    catch(err){
        return res.status(401).json({message:"Unauthrized access"})
    }
}