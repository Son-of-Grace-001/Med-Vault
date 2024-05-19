// import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import {IoIosMenu, IoIosClose } from "react-icons/io";
import '../styling/Nav.css';
import logo2 from './images/logo2.jpg'
import logo from './images/logo.jpg'
import {Link} from 'react-router-dom'

function Nav () {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    const navOptions = document.querySelector('.nav-options');
    if (navOptions){
      navOptions.style.display = isMenuOpen ? 'none' : 'block'
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    const navOptions = document.querySelector('.nav-options');
    if (navOptions){
      navOptions.style.display = 'none'
    }
  }

  return (
    <nav>
      <div className='nav-cont'>
        <div className='right-nav'>
          <img className='logo' src={logo2} alt='medvault logo'/>
          <img id="logos" className='logo' src={logo} alt='medvault logo'/>
        </div>

        <div className='other-part'>
          <ul className="nav-options">
            <a href='/'><li className='nav-item'>Home</li></a>
            <a href='#about'><li className='nav-item'>About Us</li></a>
            <input className="search" type="search" placeholder="Enter your location" />
            <a href='#service'><li className='nav-item'>Service</li></a>
            <a href='#contact'><li className='nav-item'>Contact Us</li></a>
            <a href='#service'><li  id="bttn" className='nav-item'>Login</li></a>
            <a href='#service'><li id="bttn" className='nav-item'>Sign Up</li></a>
          </ul>
        </div>

        <div className="third">
          <Link to="/login">
            <button className="btn btn-primary" >Login</button>
          </Link>
          <Link to="/signup">
            <button  className="btn btn-light" >SignUp</button>
          </Link>
        </div>
        <div className='div'>
          {isMenuOpen ? (
            <IoIosClose className='close'
              role='button'
              style={{
                fontSize: '40px',
              }}
              onClick={closeMenu}
            />
          ):(
            <IoIosMenu className='menu'
              role='button'
              style={{
                fontSize: '40px'
              }}
              onClick={toggleMenu}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;