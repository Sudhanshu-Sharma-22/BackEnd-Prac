import { useState } from "react";

export function CreateTodo(){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    return <div>
        <input type="text" placeholder="title" onChange={function(e){
            const value=e.target.value;
            setTitle(value);
        }}/><br />
        <input type="text" placeholder="description" onChange={function(e){
            const value=e.target.value;
            setDescription(value);
        }}/><br />
        <button onClick={function(){
            fetch("http://localhost:3000/todo",{
                method: "POST",
                body: JSON.stringify({
                    title:title,
                    description:description
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(async function(res){
                const json=await res.json();
                alert("ToDo Added");
                setTitle("");
                setDescription("");
                // Refresh the page to show new todo
                window.location.reload();
            }).catch(function(err){
                alert("Error adding todo");
                console.error(err);
            })
        }}>add a todo</button>
    </div>
}
