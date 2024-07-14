import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    const name = localStorage.getItem("name")
    
    return <div className="bg-white h-screen flex justify-center">
        <div className="w-full bg-white text-center p-2 h-max px-4 mx-96 mt-24">
            <Appbar name={name[0].toUpperCase()} />
            <div className="m-8">
                <Balance />
                <Users />
            </div>
        </div>
    </div>
}