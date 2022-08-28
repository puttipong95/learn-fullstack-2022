import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  let history = useNavigate()

  const login = () => {
    const data = {username, password}
    axios.post('http://localhost:3001/auth/login', data)
    .then((res) => {
      if(res.data.error){
        alert(res.data.error)
      }else{
        sessionStorage.setItem('accessToken', res.data)
        history('/')
      }
    })
  }

  return (
    <div className='login-container'>
      <input type='text' onChange={(e) => {setUsername(e.target.value)}}/>
      <input type='password' onChange={(e) => {setPassword(e.target.value)}}/>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login