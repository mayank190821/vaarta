import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Register from './pages/register'
import Login from './pages/login'
import Chat from "../src/pages/chat"
import SetAvatar from './pages/setAvatar'
const AppRouter = () => {
  return (
<BrowserRouter>
    <Routes>
        <Route path="/register" element = {<Register/>}></Route>
        <Route path="/login" element = {<Login/>}></Route>
        <Route path="/setAvatar" element = {<SetAvatar/>}></Route>
        <Route path="/" element = {<Chat/>}></Route>
    </Routes>
</BrowserRouter>
  )
}

export default AppRouter