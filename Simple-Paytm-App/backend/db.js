const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});

const mongooseSchema = new mongoose.Schema({
    username:String,
    firstName:String,
    lastName:String,
    password:String
});

const accountSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    balance:{
        type:Number
    }
})

const User=mongoose.model("User",mongooseSchema);
const Account=mongoose.model("Account",accountSchema);

module.exports={
    User,
    Account
}