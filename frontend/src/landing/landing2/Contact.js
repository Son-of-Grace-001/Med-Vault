import React from 'react'
import { FaMapMarker, FaEnvelope, FaPhone } from 'react-icons/fa'
import '../styling/Contact.css'

function Contact () {
  return (
    <div id='contact'>
      <h3 className='serv'> Contact Us</h3>
        <div className='line'>
          <div className='lin1'></div>
          <div className='lin2'></div>
          <div className='lin3'></div>
        </div>
      <div className='contact'>
        <div className='left-contact'>
          <div className='firstt'>
            <div className='first1'>
              <FaMapMarker className='faa'/>
            </div>
            <div className='first2'>
              <h3 className='h33'>Location:</h3>
              <p className='address'>Adeleke University</p>
            </div>
          </div>

          <div className='firstt'>
            <div className='first1'>
              <FaEnvelope className='faa'/>
            </div>
            <div className='first2'>
              <h3 className='h33'>Email:</h3>
              <p className='address'>Adelekeuniversity@gmail.com</p>
            </div>
          </div>

          <div className='firstt'>
            <div className='first1'>
              <FaPhone className='faa'/>
            </div>
            <div className='first2'>
              <h3 className='h33'>Call:</h3>
              <p className='address'>+2349039672814</p>
            </div>
          </div>
        </div>

        <div className='right-contact'>
          <form>
            <div className='form-grid'>
              <div>
                <label>Name</label>
                <input type='text' placeholder='Enter your full name'/> 
              </div>
              <div>
                <label>Email</label>
                <input type='email' placeholder='example@gmail.com'/>
              </div>
            </div>

            <label>Subject</label>
            <input type='text' placeholder='Enter the subject of your message'/>

            <label>Message</label>
            <textarea cols={20} rows={10} placeholder='Message'></textarea>

            <div className='submit-btn'>
              <button type='submit' className='submitt'> Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Contact;