import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link,useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/api.routes';

function Login() {
  const navigate= useNavigate();
  const reUser = /^[a-zA-Z0-9]+.{3,20}$/
  let rePassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
  const [value, setValue] = useState({
    username: "",
    password: "",
  })
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
  }
  const handleValidation = () => {
    const { username,password } = value;
    if (!rePassword.test(password)) {
      toast.error("Must use A-Z, a-z, 0-9 and !@#$%^&*()", toastOptions)
    }
    else if (!reUser.test(username)) {
      toast.error("Use correct Username.", toastOptions)
      return false;
    }
    return true;
  }
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  },[])
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = value;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem(
          "chat-app-user", JSON.stringify(data.user)
        )
        navigate("/");
      }
    }
  }
  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <FormContainer>
        <form onSubmit={(event) => {
          handleSubmit(event)
        }}>
          <div className="brand">
            <img src="" alt="" />
            <h1>Vaarta</h1>
          </div>
          <input type="text"
            placeholder='Username'
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input type="password"
            placeholder='Password'
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <button type='submit'> Login</button>
          </div>
          <span>
            Don't have an Account?<Link to="/register"> Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer
        autoClose={5000}
      />
    </div>
  )
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #070f35;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 5rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
}
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #4e0eff;
  border-radius: 0.4rem;
  color: white;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #997af0;
    outline: none;
  }
}
button {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}
span {
  color: white;
  text-transform: uppercase;
  a {
    color: #4e0eff;
    text-decoration: none;
    font-weight: bold;
  }
}
`;

export default Login