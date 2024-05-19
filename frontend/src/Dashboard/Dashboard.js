import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashoard.css";

export const Dashboard = () => {
  const [patient, setPatient] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  const [sliceVal, setSliceVal] = useState(4)
  // const [sliceVals, setSliceVals] = useState(2)

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/patient/");
        if (!response.ok) {
          throw new Error("Failed to fetch journal entries");
        }
        const data = await response.json();
        setPatient(data);
      } catch (error) {
        console.error("Failed to fetch journal entries:", error);
      }
    };

    fetchPatient();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const filteredPatients = patient.filter((patient1) =>
    patient1.email.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, sliceVal);

  const seeMore = () => {
    setSliceVal(sliceVal + 4)
  }

  const seeLess = () => {
    setSliceVal(sliceVal - 4)
  }

  return (
    <div className="dashbord">
      <div className="admin">Welcome to MedVault Admin Dashboard</div>
      <div className="the-grid">
        <div className="left-grid">
          <Link to="/">
            <button className="logout">Logout</button>
          </Link>
        </div>

        <div className="right-grid">
          <input
            className="searchh"
            type="search"
            placeholder="Enter the patient email"
            onChange={handleSearch}
            value={searchQuery}
          />
        </div>

        <div className="last">
          <Link to="/register">
            <button className="register">Register</button>
          </Link>
        </div>
      </div>
      <div className="cont-list">
        <h3 className="list">List of Patients</h3>
      </div>
      <table className="patient-table">
        <thead>
          <tr className="head">
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patients, index) => (
          <tr className="data" key={index}>
            <td>
            <Link className='record-link' to={`/otp/${patients.id}/`}> 
              {patients.firstname}
            </Link>
            </td>

            <td>
            <Link className='record-link' to={`/otp/${patients.id}/`}> 
              {patients.lastname}
            </Link>
            </td>

            <td>
            <Link className='record-link' to={`/otp/${patients.id}/`}> 
              {patients.email}
            </Link>
            </td>

            <td>
            <Link className='record-link' to={`/otp/${patients.id}/`}> 
              {patients.gender}
            </Link>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      <div className="btn-show">
        <button className="seee" onClick={seeLess}>Show Less</button>
        <button className="see" onClick={seeMore}>Show More</button>
      </div>
    </div>
  );
};
