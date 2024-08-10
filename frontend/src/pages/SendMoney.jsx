import { useSearchParams } from "react-router-dom";
import { Friends } from "../components/Friends";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from '../config';

const { backendUrl } = config;

export const SendMoney = () => {
    const [useParams] = useSearchParams();
    const userId = useParams.get("id");
    const name = useParams.get("name");
    const [amount, setAmount] = useState(null);
    const [transactionStatus, setTransactionStatus] = useState(null);
    const [loading, setLoading] = useState(false); // Added loading state
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId || !name) {
            navigate("/dashboard");
        }
    }, [userId, name, navigate]);

    const SendMoneyRequest = () => {
        setLoading(true); // Set loading to true when request starts
        axios.post(`${backendUrl}/api/v1/account/transfer`, {
            to: userId,
            amount
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setTransactionStatus(response.data.message);
                setLoading(false); // Set loading to false when request completes
            })
            .catch((e) => {
                setTransactionStatus(e.response.data.message);
                setLoading(false); // Set loading to false if there's an error
            });
    };

    return (
        <div className="flex justify-center bg-slate-300 h-screen">
            <div className="flex flex-col justify-center">
                <div className="w-96 bg-white rounded-lg shadow-md text-center p-2 pb-8 h-max px-10">
                    <Heading label={"Send Money"} />
                    <Friends starts={name[0].toUpperCase()} name={name} />
                    <InputBox
                        onChange={(e) => {
                            setAmount(parseInt(e.target.value));
                            setTransactionStatus("");
                        }}
                        heading={"Amount ( ₹ )"}
                        placeholder={"Enter amount"}
                    />
                    <button
                        onClick={
                            SendMoneyRequest
                        }
                        className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? "Transferring..." : "Initiate Transfer"}
                    </button>
                    {transactionStatus && (
                        <div className="mt-4 text-green-500">
                            {transactionStatus}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
