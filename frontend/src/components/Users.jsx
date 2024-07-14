import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputBox } from "./InputBox";


export const Users = () => {
    // Replace with backend call
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
            .then((response) => {
                const filteredUsers = response.data.user.filter(users => users.username != username)
                setUsers(filteredUsers);
            })
    }, [filter])
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <InputBox onChange={(e) => {
                setFilter(e.target.value);
            }} placeholder={"Search Users..."} />
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-300 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0].toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/sendmoney?id=" + user._id + "&name=" + user.firstName + " " + user.lastName);
            }} label={"Send Money"} />
        </div>
    </div>
}