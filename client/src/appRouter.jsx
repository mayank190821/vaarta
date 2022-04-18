import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Register from './pages/register'
import Login from './pages/login'
import Chat from './pages/chat'
const AppRouter = () => {
  return (
<BrowserRouter>
    <Routes>
        <Route path="/register" element = {<Register/>}></Route>
        <Route path="/login" element = {<Login/>}></Route>
        <Route path="/chat" element = {<Chat/>}></Route>
    </Routes>
</BrowserRouter>
  )
}

export default AppRouter