import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Copyrightcomp from '../Childcomp/Copyrightcomp'
import Footer from '../Childcomp/Footer'
import Header from '../Childcomp/Header'
import Popupcomp from '../Childcomp/Popupcomp'
import Refercomp from '../Childcomp/Refercomp'
import Register from '../Childcomp/Register'
import "./RegisterPage.css"
const Registerpage = () => {
  const [popup,setpopup]=useState(false)
  const handlepopup=(val)=>{
    setpopup(val)
  }
  return (
    <div id='Register-page'>Registerpage
    <div id='Laundry-reg'>Laundry Sevice</div>
    <div id='Doorstep-reg'>Doorstep Wash & Dryclean Service</div>
    <div id='Account-reg'>Don't Have Account</div>
    <div id='vertical-div-reg'></div>
    <Link to="/Register">
    <button id="button-regpage">Register</button></Link>
    <Header/>
    <Register handlepopup={handlepopup}/>
    <Refercomp/>
    <Footer />
    <Copyrightcomp/>
    {popup && 
    <Popupcomp/>}
    </div>
  )
}

export default Registerpage