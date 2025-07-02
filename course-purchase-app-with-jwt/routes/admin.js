const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt=require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const {Admin ,Course}=require("../db");
// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    Admin.create({
        username:username,
        password:password
    }).then(()=>{
        res.json({
            message:"Admin created Succesfully"
        })
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    console.log(JWT_SECRET);
    const admin=await Admin.findOne({
        username,
        password
    })
    if(admin){
        const token=jwt.sign({
            username
        },JWT_SECRET);
        res.json({
            token
        })
    }
    else{
        res.json({
            msg:"incorrect email or password"
        })
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const image=req.body.image;
    Course.create({
        title,
        description,
        image,
        price
    }).then(value => {
        res.json({
            message: "Course Created Succesfully",
            CourseId: value._id
        });
    });
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({})
    .then(function(Courses){
        res.json({
            Courses
        })
    })
});

module.exports = router;