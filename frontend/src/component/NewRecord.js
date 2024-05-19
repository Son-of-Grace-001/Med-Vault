import React, {useState} from 'react';
import './New.css'
import {Navigate, useParams} from 'react-router-dom'

export const NewRecord = () => {

  const [doc, setDoc] = useState('')
  const [docName, setDocName] = useState('')
  const [complaint, setComplaint] = useState('')
  const [diagnose, setDiagnose] = useState('')
  const [prescription, setPrescription] = useState('')
  const [hospitalName, setHospitalName] = useState('')
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [error, setError] = useState(null);
  const {id} = useParams()
 

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try{
      const response = await fetch ('http://localhost:8000/api/update/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({doc, docName, complaint, diagnose, prescription, hospitalName, id})
      });

      if (response.ok){
        setRedirectToLogin(true)
        console.log('record updateded successfully')
      } else{
        console.log ('record update failed')
        const data = await response.json()
        setError(data.error || 'record update failed')
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
    <div>
      <h3 className='new'>Add New Record</h3>
      {error && <p className="error-message">{error}</p>}
      <form id="recordForm" onSubmit={handleSubmit}>
        <label htmlFor="doc">Date of Complaint:</label>
        <input 
          type="date" 
          id="doc" name="doc" required 
          value={doc}
          onChange={(e) => setDoc(e.target.value)}
        />

        <label htmlFor="dr_name">Doctor's Name:</label>
        <input 
          type="text" 
          id="dr_name" 
          name="dr_name" required
          value={docName} 
          onChange ={(e) => setDocName(e.target.value)}
        />

        <label htmlFor="complaint">Complaint:</label>
        <input 
          type="text" 
          id="complaints" 
          name="complaints" required
          value={complaint} 
          onChange={(e) => setComplaint(e.target.value)}
        />

        <label htmlFor="diagnose">Diagnosis:</label>
        <input 
          type="text" 
          id="diagnose" 
          name="diagnose" required 
          value={diagnose}
          onChange={(e) => setDiagnose(e.target.value)}
        />

        <label htmlFor="prescription">Prescription:</label>
        <textarea 
          id="prescription" 
          name="prescription" 
          required
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
        >

        </textarea>

        <label htmlFor="hospital_name">Hospital Name:</label>
        <input 
          type="text" 
          id="hospital_name" 
          name="hospital_name" required
          value={hospitalName} 
          onChange={(e) => setHospitalName (e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
