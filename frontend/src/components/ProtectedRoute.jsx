import React from "react";
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({element: Dashboard}) => {
    const token = localStorage.getItem("token");

    return token ? <Dashboard /> : <Navigate to={"/signin"} />
}