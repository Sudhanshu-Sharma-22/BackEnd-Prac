const mongoose=require("mongoose");
const { describe } = require("node:test");
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});

const todoSchema={
    title:String,
    description:String,
    completed:Boolean
}

const todo=mongoose.model('todos',todoSchema);

module.exports={
    todo
}
