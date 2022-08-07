import React from "react";
import "./sidebar.css"
import { Link } from "react-router-dom";

const SideBar =()=>{
    return(
        <>
        <div className="sidebar">
            <div className="home"><img src="/images/home.png" alt=""/></div>
           <Link to="/create-order" ><div className="plus"><img src="/images/plus.png" alt=""/></div></Link>
            <Link to="/viewOrder"><div id="content"><img src="/images/content.png" alt=""/></div></Link>

        </div>
        </>
    )
}
export default SideBar;