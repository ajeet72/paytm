import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { NotFound } from "./pages/NotFound"

function App() {

  return (
    <div className="bg-slate-400">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Signin /> }/>
            <Route path="/signup" element={ <Signup /> }/>
            <Route path="/signin" element={ <Signin /> }/>
            <Route path="/dashboard" element={ <ProtectedRoute element={ Dashboard } /> }/>
            <Route path="/sendmoney" element={ <SendMoney/> }/>
            <Route path="/*" element={ <NotFound /> }/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
