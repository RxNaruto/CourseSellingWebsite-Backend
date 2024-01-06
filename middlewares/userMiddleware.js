const {Admin,User,Course} = require('../database/db');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config");
const { decode } = require('punycode');

const userAuthMiddleware= async (req,res,next)=>{
    const username = req.headers.username;
    const password = req.headers.password;

    const checkUser = await User.findOne({
        username,
        password
    })
    if(checkUser){
        next();
    }
    else{
        res.status(403).json({
            msg: "You are not authorized"
        })
    }
    
}

const tokenVerification=(req,res,next)=>{
    const token = req.headers.authorization;
    const words =  token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken,JWT_SECRET);
    if(decodedValue.username){
        next();
    }
    else{
        res.json({
            msg:"You are not authenticated"
        })
    }
}

module.exports={
    userAuthMiddleware,
    tokenVerification
}