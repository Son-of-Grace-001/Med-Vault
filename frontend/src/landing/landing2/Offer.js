import React from 'react'
import {FaAmbulance, FaFileMedical, FaAccessibleIcon, FaRocket, FaLock} from 'react-icons/fa'
import '../styling/offer.css'

function Offer () {
  return(
    <div>
      <div id="service" className="offer-div">
        <div className='containerr'>
          <div className="shadow">
            <div>
              <FaAmbulance className="offer-icon"/>
            </div>
          </div>
          <h6>Urgent Care</h6>
          <p>
            Immediate, expert care for non-life-threatening 
            medical concerns. Walk in and get the help you need 
            without delay at our urgent care center.
            Our service is universal.
          </p>
        </div>

        <div className='containerr'>
          <div className="shadow">
            <div>
              <FaFileMedical className="offer-icon"/>
            </div>
          </div>
          <h6>Digitalized Record</h6>
          <p>
            Access your medical records anytime, anywhere with our 
            digitalized record system. Secure, convenient, and always 
            accessible for your needs.
          </p>
        </div>

        <div className='containerr'>
          <div className="shadow">
            <div>
              <FaAccessibleIcon className="offer-icon"/>
            </div>
          </div>
          <h6>Accessibility</h6>
          <p>
            Accessible healthcare for all. Our platform 
            is designed to accommodate individuals of all 
            abilities, ensuring everyone receives the care they deserve.
          </p>
        </div>

        <div className='containerr'>
          <div className="shadow">
            <div>
              <FaRocket className="offer-icon"/>
            </div>
          </div>  
          <h6>Efficienct</h6>
          <p>
            Efficiency is key in our care approach. 
            From streamlined processes to optimized workflows, 
            we ensure swift and effective treatment for all our patients.
          </p>
        </div>

        <div className='containerr'>
          <div className="shadow">
            <div>
              <FaLock className="offer-icon"/>
            </div>
          </div>
          <h6>Patient Confidentiality</h6>
          <p>
            Confidentiality is paramount in our services. 
            Your privacy is protected with strict protocols 
            and secure systems to ensure the confidentiaity of data at all time.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Offer;