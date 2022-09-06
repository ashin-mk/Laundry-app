import React from 'react'
import './Popupcomp.css'
import { Link } from 'react-router-dom'

const Popupcomp = () => {
  return (
    <div id='Popup-reg-comp' onClick={()=> window.location.reload(false)}>
        <p>Successfully Registered<br/>Click Ok to Signin</p>
        <Link  to="/Signin"><button>Ok</button></Link>
    </div>
  )
}

export default Popupcomp