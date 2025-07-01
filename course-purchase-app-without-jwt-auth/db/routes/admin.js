const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin , Course}=require("../db");

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

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    // const username=req.headers.username;
    // const password=req.headers.password;
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const image=req.body.image;
    let CourseId;
    Course.create({
        title:title,
        description:description ,
        image:image,
        price:price
    }).then(value=>{
        CourseId=value._id;
    })
    res.json({
        message:`Course Created Succesfully`,
        CourseId
    })
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