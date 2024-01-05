const {Router} = require('express');
const {adminMiddleware} = require("../middlewares/adminMiddleware");
const {Admin,User,Course} = require("../database/db");
const{JWT_SECRET} = require("../config.js");
const router = Router();
const jwt = require("jsonwebtoken");
const {adminTypeValidation} = require("../types/admin.js")

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

router.get("/signin",adminAuthMiddleware , (req,res)=>{
    const token = jwt.sign({
        username
    }, JWT_SECRET);

    res.json({
        msg: token
    })
})