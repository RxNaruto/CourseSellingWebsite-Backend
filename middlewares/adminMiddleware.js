const {Admin,User,Course} = require('../database/db');
const jwt = require('jsonwebtoken');

const adminAuthMiddleware= async (req,res,next)=>{
     const username= req.header.username;
     const password = req.header.username;
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

module.exports={
     adminAuthMiddleware
}