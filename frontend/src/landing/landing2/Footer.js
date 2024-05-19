import React from 'react'
import log from './images/logo.jpg'
import '../styling/Footer.css'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin} from 'react-icons/fa'

function Footer () {
  return (
    <div id="footer">
      <div className="footer">
        <div className="other-footer">
          <div className="top-footer">
            <img className="footer-logo" src={log} alt="logo"/>
          </div>
          <div className="footer-1">
            <a href='/'>Home</a>
            <a href='/'>About Us</a>
            <a href='/'>Contact Us</a>
            <a href='/'>Contact Us</a>
            <a href='/'>Login</a>
            <a href='/'>Sign Up</a>
          </div>
          <div className="footer-2">
            <a href='/'>Terms & Condition</a>
            <a href='/'>Privacy</a>
            <a href='/'>Our Team</a>
            <a href='/'>Our Partner</a>
            <a href='/'>FAQs</a>
          </div>
          <div className="footer-3">
            <div>
              <h5>Phone:</h5>
              <a href='tel:+2349039672814'>09039672814</a>
            </div>
            <div>
              <h5>Email:</h5>
              <a href='mailto:horlharmighty2000@gmail.com'>horlharmighty2000@gmail.com</a>
            </div>
            <div className='ok'>
              <div className='fb-cont'>
                <FaFacebook className='fb'/>
              </div>
              <div className='fb-cont'>
                <FaTwitter className='fb'/>
              </div>
              <div className='fb-cont'>
                <FaInstagram className='fb'/>
              </div>
              <div className='fb-cont'>
                <FaLinkedin className='fb'/>
              </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;