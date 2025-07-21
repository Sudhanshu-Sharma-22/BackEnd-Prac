const express=require("express");
const router=express.Router();
const zod=require("zod");
const { User, Account } = require("../db");
const {JWT_SECRET} = require("../config")
const jwt = require("jsonwebtoken")
const {authMiddleware} = require("../middlewares");
// const key=process.env.JWT_SECRET;



const signupSchema = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});


router.get("/user", (req, res) => {
    // console.log(JWT_SECRET)
    res.json({ message: "User route working" });
});

router.post("/signup",async (req,res)=>{
    // const body=req.body;
    const userName= req.body.username;
    const firstNAME= req.body.firstName;
    const lastNAME= req.body.lastName;
    const passWORD= req.body.password;

    // const {validation} = signupSchema.safeParse(body);
    // console.log(validation);
    // if(!validation){
    //     return res.status(411).json({
    //         message : "Incorrect Inputs / Username already Taken"
    //     })
    // }

    const existingUser = await User.findOne({
        username : req.body.username
    })

    if(existingUser){
        return res.json({
            message : "Incorrect Inputs / Username already Taken huh"
        })
    }

    const newUser = await User.create({
        username : userName,
        firstName : firstNAME,
        lastName : lastNAME,
        password : passWORD
    });

    const newUserId = newUser._id;

    await Account.create({
        newUserId,
        balance : 10000
    })

    const token= jwt.sign({
        newUserId
    },JWT_SECRET)

    res.status(200).json({
        message : "User Created Succesfully",
        token : token
    })
})

const signinSchema=zod.object({
    username:zod.string().email(),
    password:zod.string()
})


router.post("/signin",async function(req,res){
    const body=req.body;
    // const {validation}=signinSchema.safeParse(body);
    // if(!validation){
    //     return res.status(411).json({
    //         message : "Email Already Taken / Incorrect Inputs"
    //     })
    // }

    const user=await User.findOne({
        username:body.username,
        password:body.password
    })

    if(user){
        const token=jwt.sign({
            userId:user._id
        },JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({
        message : "Error While Logging In"
    })
})


const updateSchema = zod.object({
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.put("/",authMiddleware, async function(req,res){
    const body=req.body;
    // const {validation} = updateSchema.safeParse(body);
    // if(!validation){
    //     return res.status(411).json({
    //         message : "Error While Updating Data"
    //     })
    // }

    await User.updateOne(body,{
        id:body.userId
    })

    res.json({
        message : "Data Updated Successfully"
    })
})

router.get("/bulk",async function(req,res){
    const filter = req.query.filter || "";
    const users=await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user : users.map(user=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports=router;