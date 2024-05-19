import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {FaPlus, FaTimes} from 'react-icons/fa'
import './View.css';

export const View = () => {
  const [view, setView] = useState([]); // Initialize state to hold review data
  const [patientName, setPatientName] = useState(''); 
  const [patientEmail, setPatientEmail] = useState(''); 
  const [patientLastname, setPatientLastname] = useState(''); // Initialize state to hold patient name
  const { id } = useParams();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/record/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch record content');
        }
        const data = await response.json();
        setView(data.records); // Assuming the records are nested under a "records" key
        setPatientName(data.patient_firstname);
        setPatientEmail(data.patient_email); 
        setPatientLastname(data.patient_lastname)// Assuming the patient name is included in the response
      } catch (error) {
        console.error('Failed to fetch review entries:', error);
      }
    };
    fetchRecord();
  }, [id]);

  return (
    <div>
      <h3 className='names'>{patientName} {patientLastname} Record</h3> {/* Render patient name */}
      <div>
      <Link to='/dashboard'>
        <button className='close'>
          <FaTimes className='times'/>
        </button>
      </Link>
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date of Complaint</th>
              <th>Complaint</th>
              <th>Hospital</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {view.map((record, index) => (
              <tr key={index}>
                <td>
                {patientName} {patientLastname} <br/>
                {patientEmail}
                </td>
                <td>{record.doc}</td>
                <td>{record.complaint}</td>
                <td>{record.hospital_name}</td>
                <td className='detail'>
                  <Link  to={`/detail/${record.id}/`}>
                    <button className='view'>View Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={`/newrecord/${id}`}>
          <button className='add'>
            <FaPlus className='plus'/>
          </button>
        </Link>
      </div>
    </div>
  );
};
