import React from 'react'
import "./Footer.css"
const Footer = () => {
  return (
    <div id='Footer-comp'>
      <div className='columns'>
      <div className='M-heading'>about us</div><div id='about-content-footer'>Doorstep Wash & Dryclean Services</div>
      </div>
      <div className='columns'>
      <div className='S-heading'> Home</div><div className='content-footer'>Sign in</div><div className='content-footer'>Register</div>
      </div>
      <div className='columns'>
      <div className='S-heading'>Pricing</div>
      </div>
      <div className='columns'>
      <div className='S-heading'>Career</div><div className='content-footer'>Blogs</div><div className='content-footer'>Create</div>
      </div>
      <div className='columns'>
        <div className='S-heading'>Contact</div>
      </div>
      <div className='columns'>
        <div className='M-heading'>social media</div><div>
          <div className='footer-images'>
          <img className='img-footer' alt='facebook' src='images/facebook.svg'/>
          <img className='img-footer' alt='instagram' src='images/instagram.svg'/>
          <img className='img-footer' alt='linkedin' src='images/linkedin.svg'/>
          </div>
          </div></div>

    </div>
  )
}

export default Footer;