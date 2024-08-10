import { useEffect, useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Error } from "../components/Error";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from '../config';
const { backendUrl } = config;

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const signinRequest = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.post(`${backendUrl}/api/v1/user/signin`, {
                username,
                password,
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name", username);
            localStorage.setItem("username", username);
            navigate("/dashboard");
        } catch (error) {
            setError("Email / Password is incorrect");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center bg-slate-400 h-screen">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign In"} />
                    <SubHeading label={"Enter your information to sign in"} />
                    <InputBox
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError("");
                        }}
                        heading={"Email"}
                        placeholder={"john@example.com"} // Fixed typo in placeholder
                    />
                    <InputBox
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                        heading={"Password"}
                        placeholder={"At least 6 characters"}
                        inputType="password"
                    />
                    {error && <Error error={error} />}
                    <Button onClick={signinRequest} label={loading ? "Signing In..." : "Sign In"} />
                    <BottomWarning label={"Don't have an account? "} to={"/signup"} page={"Sign Up"} />
                </div>
            </div>
        </div>
    );
};
