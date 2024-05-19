import React, {useState} from 'react'
import './Register.css'
import { Navigate, Link } from 'react-router-dom'

export const Register = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [nationality, setNationality] = useState('')
  const [state, setState] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const [age, setAge] = useState('')
  const [phone, setPhone] = useState('')
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respone = await fetch ('http://localhost:8000/api/register/', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstname, lastname, email, phone, address, age,gender,dob, nationality, state})
      });

      if (respone.ok){
        setRedirectToLogin(true)
        console.log('patient successfully registered')
      }else{
        console.log('patient registration failed')
        const data = await respone.json();
        setError(data.error || 'registration failed')
      }
    } catch (error){
      console.error('Error:', error)
      setError('An unexpected error occurred. Please try again')
    }
  };
  if (redirectToLogin){
    return <Navigate to = "/dashboard"/>
  }


  return (
    <div className='form-divs'>
      <Link to='/dashboard' className='register2'>Close</Link>
      <div className='reg'>
        <h3>Registration Form</h3>
        <p>Please input the below information correctly</p>
        {error && <p className="error-message">{error}</p>}
        <form className='formm' onSubmit={handleSubmit}>
          <div className='inner-form'>
            <div>
              <label>Firstname:</label>
              <input
                type='text'
                value={firstname}
                placeholder='Enter your firstname'
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Lastname:</label>
              <input
                type='text'
                value={lastname}
                placeholder='Enter your firstname'
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='inner-form'>
            <div>
            <label>Email:</label>
            <input
              type='email'
              value={email}
              placeholder='example@gmail.com'
              onChange={(e) => setEmail (e.target.value)}
              required
            />
            </div>
            <div>
            <label>Phone Number:</label>
            <input
              type='tel'
              value={phone}
              placeholder='Enter your phone number'
              onChange={(e) => setPhone (e.target.value)}
              required
            />
            </div>
          </div>

          <div className='inner-form'>
            <div>
              <label>Nationality:</label>
              <input
                type='text'
                value={nationality}
                placeholder='Enter your country'
                onChange={(e) => setNationality(e.target.value)}
                required
              />
            </div>
            <div>
              <label>State/City:</label>
              <input
                type='text'
                value={state}
                placeholder='Enter your firstname'
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
          </div>
          <label>Home Address:</label>
          <input
            type='text'
            value={address}
            placeholder='Enter your home address'
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <div className='inner'>
            <div>
              <label>Age:</label>
              <input
                type='text'
                value={age}
                placeholder='Enter your age'
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Date-of-Birth:</label>
              <input
                type='date'
                value={dob}
                placeholder='Enter your firstname'
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Gender:</label>
              <select value={gender} onChange={(e) =>setGender (e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <button type='submit' className='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}
