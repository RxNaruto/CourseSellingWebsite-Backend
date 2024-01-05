const {Router} = require("express");
const { adminAuthMiddleware,tokenVerification} = require("../middlewares/adminMiddleware");
const {Admin,Course} = require("../database/db");
// const{JWT_SECRET} = require("../config.js");
const router = Router();
const jwt = require("jsonwebtoken");
const {adminTypeValidation} = require("../types/admin")
const jwtpassword = 12345;

router.post("/createadmin",adminTypeValidation,async (req,res)=>{
    const name = req.body.name;
    const username= req.body.username;
    const password = req.body.password;

     await Admin.create({
        name: name,
        username: username,
        password: password
    })
    res.json({
        msg: "Admin Created successfully"
    })
})

router.get("/signin", adminAuthMiddleware,(req,res)=>{
    const username = req.headers.username;
    const token = jwt.sign({
        username:username,
    }, "12345");

    res.json({
        msg: token
    })
})

router.get("/getCourses", async (req,res)=>{
    const response = await Course.find({});
    res.json({
        response: response
    })
})

module.exports=router;
    