const {Admin,User,Course} = require('../database/db');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config");

const adminAuthMiddleware= async (req,res,next)=>{
     const username= req.headers.username;
     const password = req.headers.password;
     const checkAdmin = await Admin.findOne({
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
    const token = req.headers.authorization; // bearer token
    const words = token.split(" "); // ["Bearer", "token"]
    const jwtToken = words[1]; // token
    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        if (decodedValue.username) {
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    } catch(e) {
        res.json({
            msg: "Incorrect inputs"
        })
    }

    

}

module.exports={
     adminAuthMiddleware,
     tokenVerification
}