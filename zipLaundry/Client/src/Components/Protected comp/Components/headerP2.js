import React from "react";
//import {Link} from "react-router-dom"
import "./headerP2.css"
import { useNavigate } from "react-router-dom";
const HeaderP2 = ()=>{

    const userName = localStorage.getItem("username");
    const navigate=useNavigate()
    const handleLogout=()=>{
        navigate('/Logout')
    }
    return(
        <>
        <header id="header">
            <div className="heading"><h2>LAUNDRY</h2></div>
          
            <div id="rigth-head">
            <div className="list1">
            <p className="pricing">Pricing</p>
            </div>
            
            <div className="list2">
                <p className="career">Career</p>
            </div>
        
            <div className="dropdown">
                {/* <button className="dropbtn">Dropdown</button> */}
                <button className="dropbtn">
                        <div className="Imgcontain">
                        <span><img id="Logo" src="/images/icon.jpg" alt=""/></span>
                        
                        <span>{userName}</span>
                        </div>
                </button>
                <div className="dropdown-content">
                <p onClick={handleLogout}>LOG OUT</p>
                
            </div>
            </div>

            </div>
            
        </header>
        </>
    )
}
export default HeaderP2;