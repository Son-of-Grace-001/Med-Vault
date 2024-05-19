import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {FaTimes} from 'react-icons/fa'
import './Record.css'

export const RecordDetail = () => {
  const [read, setRead] = useState([]); 
  const { id } = useParams();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/viewrecord/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch record content');
        }
        const data = await response.json();
        setRead(data); 
      } catch (error) {
        console.error('Failed to fetch review entries:', error);
      }
    };
    fetchRecord();
  }, [id]);
  
  return (
    <div className='recordss'>
      <Link to='/dashboard'>
        <button className='close'>
          <FaTimes className='times'/>
        </button>
      </Link>
      <div className='read-detail'>
        <p><strong>Date of Complaint:</strong> {read?.doc}</p>
        <p><strong>Hospital Name:</strong> {read?.hospital_name}</p>
        <p><strong>Doctor Name:</strong> Dr {read?.dr_name}</p>
        <p><strong>Patient Complaint:</strong> {read?.complaint}</p>
        <p><strong>Doctor Diagnosis:</strong> {read?.diagnose}</p>
        <p><strong>Prescription:</strong> {read?.prescription}</p>
      </div>
      {/* <button onClick={window.print()}> Print </button> */}
    </div>
  );
};

export default RecordDetail;
