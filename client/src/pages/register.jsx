import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"
function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("form")
  }
  const handleChange = (e) => {
    alert("handle change")
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => {
          handleSubmit(event)
        }}>
          <div className="brand">
            <img src="" alt="" />
            <h1>Vaarta</h1>
          </div>
          <input type="email"
            placeholder='Email'
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input type="password"
            placeholder='Password'
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input type="confirmPassword"
            placeholder='Confirm Password'
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type='submit'> Create user</button>
          <span>
            Already have an Account?<Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
    </>
  )
}

const FormContainer = styled.div`

`;

export default Register