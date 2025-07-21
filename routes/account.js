const express = require("express");
const {authMiddleware} = require("../middlewares");
const {mongoose} = require("mongoose");
const {Account} = require("../db");

const router=express.Router();

router.get("/balance",authMiddleware,async function(req,res){
    const account = await Account.findOne({
        userId : req.userId
    })
    // console.log(account);
    res.json({
        balance : account.balance
    })
})

router.post("/transfer",async function(req,res){
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount, to} = req.body;

    // console.log(amount,to)

    const account = await Account.findOne({
        userId : req.userId
    }).session(session);

    // console.log(account)

    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Insufficient Balance"
        })
    }

    const toAccount= await Account.findOne({
        userId : to
    }).session(session);
    console.log(toAccount)
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Invalid Account to Tranfer Funds"
        })
    }

    await Account.updateOne({
        userId : req.userId
    },{
        $inc:{
            balance : -amount
        }
    }).session(session);

    await Account.updateOne({
        userId : to
    },{
        $inc:{
            balance : amount
        }
    }).session(session);

    await session.commitTransaction();
    res.json({
        message : "Funds Tranferred Successfully"
    })
})

module.exports=router;