import React from 'react'
import Nav from './Nav'
import Hero from './Hero'
import Offer from './Offer'
import About from './About'
import Contact from './Contact'
import Footer from './Footer'

export const Landing = () => {
  return (
    <div>
      <Nav/>
      <Hero/>
      <Offer/>
      <About/>
      <Contact/>
      <Footer/>
    </div>
  )
}