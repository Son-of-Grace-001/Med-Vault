import  React from 'react';
import './SignUpForm.css'
import { useState } from 'react'
import { Link , Navigate} from 'react-router-dom'

export const SignUpForm = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [license, setLicense] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch ('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, address, license, password, cpassword}),
      });

      if (response.ok){
        setRedirectToLogin(true);
        console.log('registration sucessful')
        
      }else{
        console.log('registration failed');
        const data = await response.json();
        setError(data.error || 'Registration failed. Please try again.');
      }
    }catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  if (redirectToLogin) {
    // Redirect to login page after successful registration
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="helop">
      <div className="signup-form-container">
        <h2 className="signup">Signup Form</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Hospital Name:</label>
          <input className="input"
            type="text"
            id="hospitalName"
            // name="hospitalName"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <label For="email">Email:</label>
          <input className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Hospital Address:</label>
          <input className="input"
            type="text"
            id="hospitalAddress"
            // name="hospitalAddress"
            value={address}
            onChange={(e) => setAddress (e.target.value)}
          />
          <label>License Number:</label>
          <input className="input"
            type="text"
            id="licenseNumber"
            // name="licenseNumber"
            value={license}
            onChange={(e) => setLicense (e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input className="input"
            type="password"
            id="password"
            // name="password"
            value={password}
            onChange={(e) => setPassword (e.target.value)}
          />
          <label>Confirm Password:</label>
          <input className="input"
            type="password"
            id="confirmPassword"
            // name="confirmPassword"
            value={cpassword}
            onChange={(e) => setCpassword (e.target.value)}
          />
          <button type="submit" className="submit-bttn">Signup</button>
          <p className='go'> Already have an account ? Please click <span> <Link className="here" to='/login'>here</Link></span> to login</p>
        </form>
      </div>
    </div>
  );
};