const express=require("express");
const app=express();
const port=3000;
app.use(express.json());
const {createToDo, updateToDo}=require("./types");
const {todo}=require("./db");
const cors=require("cors");
app.use(cors());

app.post("/todo",async (req,res)=>{
    const input=req.body;
    const parsedInput=createToDo.safeParse(input);
    if(!parsedInput.success){
        res.status(411).json({
            msg:"Wrong Inputs"
        })
        return;
    }
    await todo.create({
        title:input.title,
        description:input.description,
        completed:false
    })
    res.json({
        msg : "ToDo Created"
    })
})

app.get("/todos",async (req,res)=>{
    const allEntries=await todo.find({});
    res.json({
        allEntries
    });
})

app.put("/completed",async (req,res)=>{
    const input=req.body;
    const parsedInput=updateToDo.safeParse(input);
    if(!parsedInput.success){
        res.status(411).json({
            msg:"Wrong Inputs"
        })
        return;
    }
    await todo.updateOne({
        _id:input.id
    },{
        completed:true
    })
    res.json({
        msg:"ToDo Marked as Completed"
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
