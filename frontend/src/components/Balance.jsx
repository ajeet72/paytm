import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = () => {
    const [balance, setBalance] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setBalance(response.data.balance)
            })
    }, [token])
    return (
        <div className="flex">
            <div className="font-bold text-lg">
                Your balance:
            </div>
            <div className="font-semibold ml-4 text-lg">
                ₹ {balance}
            </div>
        </div>
    );
};
