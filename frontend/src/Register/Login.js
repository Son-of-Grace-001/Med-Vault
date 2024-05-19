import React from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './Login.css'

export const Login = () => {

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch ('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (response.ok) {
        setRedirectToLogin(true)
        console.log('login successful')
      }else{
        console.log('login failed')
        const data = await response.json();
        setError(data.error || 'Invalid email or password  ')
      }
    } catch (error){
      console.error('Error:', error)
      setError('An unexpected error occurred. Please try again')
    }
  };

  if (redirectToLogin){
    return <Navigate to="/dashboard"/>
  }

  return (
    <div className='div-form'>
      <div className="signup-form-container">
        <h2 className="signup">Login Form</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label For="email">Email:</label>
          <input className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
    
          <label htmlFor="password">Password:</label>
          <input className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword (e.target.value)}
          />
         
          <button type="submit" className="submit-bttn">Login</button>
          <p className='go'> Don't have an account yet? Please click <span> <Link className="here" to='/signup'>here</Link></span> to signup</p>
        </form>
      </div>
    </div>
  )
}
