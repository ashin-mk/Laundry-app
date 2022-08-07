import React from "react";
import "./delete_alert.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

  const Alert =(props)=>{
    // console.log(props)
      const DeleteOrder = (id)=>{
        // e.preventDefault();
        axios.delete(`https://ashin-laundry-server.herokuapp.com/cancel/${id}`).then(()=>{
          window.location.reload(false)
          // Navigate("/viewOrder");
        })
    }
  return(
    <>
    <div className="containerP1">
      <div className="Card">
        <div className="H">
        <p>Alert</p>
        <button className="cross" onClick={()=>{props.closeAlert(false)}}>X</button>
        </div>
        <div className="cmain">
          <img src="/images/danger.jpg" alt="Danger" height={70} width={70} className="danger"/>
          <p>Are you Sure you want to cancel the order No: <p id="delete_order_id">{props.viewdatasummary.orderId}</p></p>
        </div>
        <button className="proceed" onClick={()=> {DeleteOrder(props.viewdatasummary.orderId)}}>Proceed</button>
      </div>
    </div>
    </>
  )
}
export default Alert;