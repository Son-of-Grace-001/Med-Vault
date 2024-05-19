import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import './Otp.css';

export const Otp = () => {
  const [otp, setOtp] = useState('');
  const [redirectToRecord, setRedirectToRecord] = useState(false);
  const [error, setError] = useState(null);
  const [otpMessage, setOtpMessage] = useState('');
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/verifyotp/${id}/`, {
        method: 'PUT',  // Change to PUT for OTP verification
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      if (response.ok) {
        setRedirectToRecord(true);
        console.log('OTP verification successful');
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again');
    }
  };

  const generateOtp = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/sendotp/${id}/`, {
        method: 'POST',  // POST request to generate OTP
      });

      if (response.ok) {
        setOtpMessage('OTP sent successfully to your email.');
        setError(null);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to send OTP');
        setOtpMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again');
      setOtpMessage('');
    }
  };

  if (redirectToRecord) {
    return <Navigate to={`/record/${id}`} />;
  }

  return (
    <div className="otp-container">
      <form onSubmit={handleSubmit} className='otp-form'>
        {error && <p className="error-message">{error}</p>}
        {otpMessage && <p className="success-message">{otpMessage}</p>}
        <label htmlFor="otp">OTP:</label>
        <input
          id="otp"
          type="text"
          placeholder="Enter the OTP sent to your email"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
            setError(null);  // Clear error message on input change
          }}
        />
        <p className="generate" onClick={generateOtp}>Generate OTP</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
