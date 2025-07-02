const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course}=require("../db");
// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username=req.headers.username;
    const password=req.headers.password;
    User.create({
        username,
        password
    }).then(()=>{
        res.json({
            msg:"User Created Succesfully"
        })
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    console.log(JWT_SECRET);
    const user=await User.findOne({
        username,
        password
    })
    if(user){
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

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({})
        .then((response)=>{
            res.json({
                response
            })
        })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const id=req.params.courseId;
    const username=req.username;
    User.updateOne(
        {"username" : username},
        {$push: {purchasedCourses:id}}
    ).then(()=>{
        res.json({
            msg:"Course Purchased Successfully"
        })
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username=req.headers.username;
    const password=req.headers.password;
    const user= await User.findOne({
        username,
        password
    });
    const courses=await Course.find({
        _id:{
            "$in":user.purchasedCourses
        }
    });
    res.json({
        courses
    })
});

module.exports = router