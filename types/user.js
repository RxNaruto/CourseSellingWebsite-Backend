const zod = require('zod');

const userSchema = zod.string().min(3);
const passSchema = zod.string().min(8);
const nameSchema = zod.string().min(3);


const userTypeValidation=(req,res,next)=>{
    const name=req.body.name;
    const username=req.body.username;
    const password=req.body.password;

    const nameValidation=nameSchema.safeParse(name);
    const userValidation=userSchema.safeParse(username);
    const passValidation=passSchema.safeParse(password);

    if(!nameValidation.success || !userValidation.success || !passValidation.success){
        res.status(403).json({
            msg: "wrong input"
        })
    }
    else{
        next();
    }

    
}



module.exports={
    userTypeValidation
 
}
