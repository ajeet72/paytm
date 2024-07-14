import { useEffect, useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, []);

    return <div className="flex justify-center bg-slate-400 h-screen">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter your information to sign in"}/>
                <InputBox onChange={(e) => {
                    setUsername(e.target.value)
                }} heading={"Email"} placeholder={"john@gamil.com"} />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value)
                }} heading={"Password"} placeholder={"at least 6 characters"} />
                <Button onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                        username,
                        password,
                    })
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("name", username)
                    localStorage.setItem("username", username)
                    navigate("/dashboard")
                }} label={"Sign In"} />
                <BottomWarning label={"Don't have an account? "} to={"/signup"} page={"Sign Up"}/>
            </div>
        </div>
    </div>
}