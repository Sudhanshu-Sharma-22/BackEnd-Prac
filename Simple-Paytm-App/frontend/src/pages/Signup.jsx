import { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {Heading} from "../components/Heading"
import {SubHeading} from "../components/SubHeading"
import {InputBox} from "../components/InputBox"
import {BottomWarning} from "../components/BottomWarning"
import {Button} from "../components/Button"

export const Signup = function(){
    const [username,setUsername]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"}></Heading>
                <SubHeading label={"Enter your infromation to create an account"}></SubHeading>
                <InputBox placeholder="Enter Your First Name" label="FirstName" onChange={function(e){
                    setFirstName(e.target.value)
                }}></InputBox>
                <InputBox placeholder="Enter Your Last Name" label="LastName" onChange={function(e){
                    setLastName(e.target.value)
                }}></InputBox>
                <InputBox placeholder="Enter Your Mail" label="Email" onChange={function(e){
                    setUsername(e.target.value)
                }}></InputBox>
                <InputBox placeholder="Enter Your Password" label="Password" onChange={function(e){
                    setPassword(e.target.value)
                }}></InputBox>
                <div className="pt-4">
                    <Button onClick={async function(){
                        const res=await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem("token",res.data.token);
                        navigate("/dashboard");
                    }} label={"Sign Up"}>
                    </Button>
                </div>
                <BottomWarning label={"Already have an Account?"} buttonText={"Sign In"} to={"/signin"}></BottomWarning>
            </div>
        </div>
    </div>
}