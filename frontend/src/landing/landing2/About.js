import React from 'react'
import about from './images/about.jpg'
import { FaCompass } from 'react-icons/fa'
import { FaLightbulb } from 'react-icons/fa'
import { FaUserShield } from 'react-icons/fa'
import '../styling/About.css'

function About () {
  return (
    <div id='about'>
      <div className='about-div'>
        <div className='imgg'>
          <img src={about} alt='about photo'/>
        </div>

        <div className='other'>
          <h3 className='about-h'>
            About Us
          </h3>
          <p>
            Welcome to MedVault, your trusted digital healthcare 
            platform. We're committed to modernizing patient data 
            management with secure, user-friendly solutions. 
            MedVault offers healthcare providers a streamlined 
            system to securely store, access, and manage patient 
            records. With advanced encryption and stringent security 
            measures, your data confidentiality is our top priority.
            Whether you're a healthcare professional or a patient, 
            MedVault empowers you to streamline workflows and make 
            informed healthcare decisions effortlessly.
          </p>
          <div className='inner-flex'>
            <div className='flexx'>
              <div className='icons'>
                <FaLightbulb className='fa'/>
              </div>
              <div className='fa-flex'>
                <h4>Our Vision</h4>
                <p>
                  We aspire to be the foremost healthcare 
                  destination, distinguished for our relentless 
                  pursuit of patient-centered care, groundbreaking 
                  research, and community enrichment.
                </p>
              </div>
            </div>

            <div className='flexx'>
              <div className='icons'>
                <FaCompass className='fa'/>
              </div>
              <div className='fa-flex'>
                <h4>Our Mission</h4>
                <p>
                  We are committed to providing unparalleled 
                  healthcare, blending expertise with compassion 
                  to enhance the well-being of every individual 
                  in our care. Through innovation and excellence, 
                  we empower healthier lives and communities.
                </p>
              </div>
            </div>

            <div className='flexx'>
              <div className='icons'>
                <FaUserShield className='fa'/>
              </div>
              <div className='fa-flex'>
                <h4>Our Value</h4>
                <p>
                  At the core of our practice are Compassion, 
                  Excellence, Integrity, Innovation, and 
                  Collaboration, guiding our daily endeavors to 
                  ensure the utmost quality in care and service 
                  delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default About;