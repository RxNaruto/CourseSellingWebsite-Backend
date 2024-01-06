const {Router} = require('express');
const router = Router();
const jwt=require('jsonwebtoken');
const{ User} = require("../database/db");
const {JWT_SECRET} = require("../config");
const {userTypeValidation} = require("../types/user");

const {userAuthMiddleware,tokenVerification} = require("../middlewares/userMiddleware");

router.post("/createUser",userTypeValidation,async (req,res)=>{
    const name=req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    await User.create({
        name:name,
        username: username,
        password: password

    })
    res.json({
        msg: "User Created Successfully"
    })
})

router.post("/courseBuying:/courseId",tokenVerification,async (req,res)=>{
    const courseId=req.params.courseId;
    const username=req.headers.username;
    await User.findOne({
        username: username
    },{
         "$push": {
            purchasedCourse: courseId
         }
    })
    res.json({
        msg: "Purchase Successful"
    })
})
router.post("/signin",userAuthMiddleware,async (req,res)=>{
    const username = req.headers.username;
    const token = jwt.sign({
        username: username
    }, JWT_SECRET);
    res.json({
       msg: token
    })

})

module.exports=router;
