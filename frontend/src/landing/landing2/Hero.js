import React from 'react';
import ImageHero from './images/ImageHero.webp';
import '../styling/hero.css';

function Hero () {
  return (
    <div>
      <div className='outdiv'>
        <div className='right-divv'>
          <div className='leftt'>
            <img  src={ImageHero} alt='Hero-picture'/>
          </div>
        </div>
        <div className='rightt'>
          <h1 className='hero-welcome'><span className='to'>Welcome to</span> <br/> <span className='med'>MedVault <span className='to'>Healthcare-providers</span> Assistant</span></h1>
          <p className='med-text'>
            Your all-in-one solution for managing patient 
            records efficiently and securely. Streamline your 
            workflow, access patient information instantly, 
            and provide better care with MedVault. Join thousands 
            of healthcare professionals who trust MedVault for their 
            practice needs.
          </p>
          <div className='btt-div'>
            <button className='btt-btt'>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;
