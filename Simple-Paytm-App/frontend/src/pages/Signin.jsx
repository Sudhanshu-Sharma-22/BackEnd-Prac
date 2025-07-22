import { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {Heading} from "../components/Heading"
import {SubHeading} from "../components/SubHeading"
import {InputBox} from "../components/InputBox"
import {BottomWarning} from "../components/BottomWarning"
import {Button} from "../components/Button"

export const Signin = function(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"}></Heading>
                <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
                <InputBox placeholder="Enter Your Mail" label={"Email"} onChange={function(e){
                    setUsername(e.target.value);
                }}></InputBox>
                <InputBox placeholder="Enter Your Password" label={"Password"} onChange={function(e){
                    setPassword(e.target.value);
                }}></InputBox>
                <div className="pt-4">
                    <Button label={"Sign In"} onClick={async function(){
                        const res=await axios.post("http://localhost:3000/api/v1/user/signin",{
                            username,
                            password
                        })
                        localStorage.setItem("token",res.data.token);
                        navigate("/dashboard")
                    }}></Button>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}></BottomWarning>
            </div>
        </div>
    </div>
}