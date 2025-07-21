const express = require('express')
const app=express();
const port=3000;
const mainRouter=require("./routes/index")
const cors=require("cors");
require('dotenv').config();

// console.log(process.env.JWT_SECRET);
app.use(cors());
app.use(express.json());

app.get('/',function (req,res){
    res.send("hello");
})

app.use("/api/v1",mainRouter);


app.listen(port);
