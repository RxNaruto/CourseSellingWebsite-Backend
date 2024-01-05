const {Admin,User,Course} = require('../database/db');
const jwt = require('jsonwebtoken');

const adminAuthMiddleware= async (req,res,next)=>{
     const username= req.headers.username;
     const password = req.headers.username;
     const checkAdmin = await Admin.find({
        username,
        password
     })
     if(checkAdmin){
        next();
     }
     else{
        res.json({
            msg: "incorrect details"
        })
     }
    

   
    
}
const tokenVerification = (req,res,next)=>{
    const token = req.header.authorization;
    const words = token.split(" ");
    const jwttoken = words[1];
    const decodedValue = jwt.verify(jwttoken,JWT_SECRET);
    if(decodedValue.username){
          next();
    }
    else{
        res.status(403).json({
            msg:"You are not authorized"
        })
    }

}

module.exports={
     adminAuthMiddleware,
     tokenVerification
}