import React from "react";
import './summary.css';
import { useEffect, useState } from "react";
import Alert from "./delete_alert";

const SummaryPage = (props)=>{
    const [viewAlert, setAlert] = useState(false);
    // console.log(props.closeSum);
    // console.log(closeSum);
    if(viewAlert){
        return  <Alert viewdatasummary={props.viewdatasummary} closeAlert={setAlert}/>
    }
    let subTotal = 0, pickUpCharge = 90, total = 0;
    try {
        props.viewdatasummary.items.forEach(item => {
            subTotal += Number(item.price)
        }) 
    } catch (error) {
        window.location.reload(false)
    }
    total = subTotal + pickUpCharge;
    return(
        <>
        <div className="modalBackground">
            <div className="card">
                <div className="h">
                <p>Summary</p>
                <button id="close" onClick={() => props.closeSum(false)}>X</button>
                </div>
                <div className="section">
                    <ul type="none">
                        <li className="Title">
                           Store Location
                        </li>
                        <li className="Tval">
                        {props.viewdatasummary.storeInfo.name}
                        </li>
                    </ul>
                    <ul type="none">
                        <li className="Title">
                            Store Address
                        </li>
                        <li className="Tval">
                        {props.viewdatasummary.storeInfo.address}
                        </li>
                    </ul>
                    <ul type="none">
                        <li className="Title">
                            Phone
                        </li>
                        <li className="Tval">
                        {props.viewdatasummary.storeInfo.phone}
                        </li>
                    </ul>
                </div>
                <div className="track">
                    <ul type="none" className="track_v">
                        <li className="t_dis"><input type="radio"/>Pickup<span className="line">---------------------</span></li>
                        <li className="t_dis"><input type="radio"/>Washed<span className="line">-------------------</span></li>
                        <li className="t_dis"><input type="radio"/>Ironed<span className="line">---------------------</span></li>
                        <li className="t_dis"><input type="radio"/>Dilivered</li>
                    </ul>
                </div>
                <div className="orderDetail">
                        <div className="ord"><p><b>Order Detail</b></p></div>
                        <div id="OrderedInfo"><Totalorder info={props.viewdatasummary.items} key={props.viewdatasummary.items.name}
                            viewdatasummary={props.viewdatasummary} /></div>

                        <div id="price_foot">
                        <div className="sub_total">Sub total: <div className="Sub_val">{subTotal}</div></div>
                        <div className="pickUp">pickUp Charges: <div className="pickUp_val">{pickUpCharge}</div></div>
                        <div id="all_total_amout"><div className="All_amnt">Total:</div><div className="All_Total_val">{total}</div></div>
                        </div>

                    </div>
                <div className="display_add">
                    <p>
                        Address
                    </p>
                    <div className="address-block">
                       <p>
                        <b>Home</b><br/>
                        #223 10th road Jp Nagar <br/>Bangalore
                       </p>
                    </div>
                </div>
                <div className="foot">
                    <button className="footbtn" onClick={()=> setAlert(true)}>Cancel Order</button>
                    </div>
            </div>
        </div>
        
        </>
    )
}
const Totalorder = (props) => {

    const washType = ["washing", "ironing", "dry-wash", "bleach"];
    console.log(props)
    return (
        <>
        
            {props.viewdatasummary.items.map((data, index)=>{
                return(
                    <div id="product-cart">
                    <div className="productType">{data.name}</div>
                    <div className="washType">
                        {
    
                            props.viewdatasummary.items[index].washType.map((a, i) => {
                                return <i key={i}>{a ? `${washType[i]}, ` : ""}</i>;
    
                            })}
                    </div>
                    <div className="priceType">
                        <div className="price_type">
                            {(props.viewdatasummary.items[index].quantity) + "X" + parseInt(Math.floor(props.viewdatasummary.items[index].price) / Math.floor(props.viewdatasummary.items[0].quantity)) + "="}
                        </div>
                        <div className="price_total">{props.viewdatasummary.items[index].price}</div>
    
                    </div>
    
                </div>
                )
            })}
                   
         
        </>
    )
}
export default SummaryPage;