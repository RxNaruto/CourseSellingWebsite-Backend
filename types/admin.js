const zod = require('zod');

const userSchema = zod.string().min(3);
const passSchema = zod.string().min(8);
const nameSchema = zod.string().min(3);
const titleSchema = zod.string().min(3);
const desSchema = zod.string().min(3);
const priceSchema = zod.number();

const adminTypeValidation=(req,res,next)=>{
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

const courseTypeValidation=(req,res,next)=>{

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    const titleValidation = titleSchema.safeParse(title);
    const desValidation = desSchema.safeParse(description);
    const priceValidation = priceSchema.safeParse(price);

    if(!titleValidation.success || !desValidation.success || !priceValidation.success){
        res.status(403).json({
            msg: "Wrong Input"
        })
    }

}

module.exports={
    adminTypeValidation,
    courseTypeValidation
}
