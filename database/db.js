const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://naruto:jVSNMMGwfSVPzHXV@cluster0.78poq1d.mongodb.net/CourseSelling")
const admin= new mongoose.Schema({
    
    name: String,
    username: String,
    password: String,
});

const user= new mongoose.Schema({

    name: String,
    username: String,
    password: String,
    purchasedCourse: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
    

});

const course= new mongoose.Schema({
    title: String,
    description: String,
    Author: String,
    price: Number

})

const Admin=mongoose.model('Admin',admin);
const User =mongoose.model('User',user);
const Course=mongoose.model('Course',course);

module.exports={
    Admin,
    User,
    Course
}
