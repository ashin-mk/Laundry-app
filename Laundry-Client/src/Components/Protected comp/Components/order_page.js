import React from "react";
import "./order_page.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SummaryPage from "./summary";
import HeaderP2 from "./headerP2";
import SideBar from "./sidebar"
import axios from "axios";
import FooterSecond from "./footerP2";

const OrderPage = ()=>{
    const [summary, setSummary] = useState(false);
    const [orderData, setOrderData] = useState([]);
    const Authtoken=localStorage.getItem("authorization")
    const [orderhistory,setorderhistory]=useState(false)
    const [viewdata, setViewdata] = useState([]);
    useEffect(() => {
        axios({
            method:'GET',
            url:'https://ashin-laundry-server.herokuapp.com/create-order',
            headers:{
                authorization:Authtoken
            }
        })
            .then((datas) => {
                setorderhistory(true)
                setOrderData(datas.data)})
    }, [])
    const handleView = (data) =>{
        setViewdata(data);
    }
    return (
        <>
    
       <HeaderP2/>
       <p className="orderv">Order | {orderData.length}</p>
        <div className="class">
        <Link to="/create-order"><button className="create">Create</button></Link>
        <img className='magnifine' src="/images/search.png" alt=""/>
        <input type="search1" className="search"/>
        </div>
       {orderhistory &&
        <div className="order">
        
        <table className="order_table" style={{border: "none"}}>
            <tr>
                <th style={{width:"90px"}}>
                    Order Id
                </th>
                <th style={{width:"150px"}}>
                    Order Date & Time
                </th>
                <th style={{width:"140px"}}>
                    Store Location
                </th>
                <th style={{width:"100px"}}>
                    City
                </th>
                <th style={{width:"100px"}}>
                    Store Phone
                </th>
                <th style={{width:"90px"}}>
                    Total Price
                </th>
                <th style={{width:"90px"}}>
                    Price
                </th>
                <th style={{width:"140px"}}>
                    Status
                </th>
                <th style={{width:"60px"}}>
                    View
                </th>
            </tr>
            </table>
            <div>
            {orderData.map((data, index)=>{
                return(

                    <div key={index} className="order_data">
                    <div className="order_p" style={{width: "110px"}}>
                    {data.orderId}
                    </div>
                    <div className="order_p" style={{width: "180px"}}>
                    {data.dateTime}
                    </div>
                    <div className="order_p" style={{width: "150px"}}>
                    {data.storeInfo.address}
                    </div>
                    <div className="order_p" style={{width: "120px"}}>
                    {data.storeInfo.name}
                    </div>
                    <div className="order_p" style={{width: "180px"}}>
                    {data.storeInfo.phone}
                    </div>
                    <div className="order_p" style={{width: "100px"}}>
                    {data.price}
                    </div>
                    <div className="order_p" style={{width: "90px"}}>
                    {data.price-90}
                    </div>
                    <div className="order_p" style={{width: "120"}}>
                    {data.status}
                    { data.status === "Ready to pickup" ? <div style={{color: "red"}} className="c_o">Cancel Order</div> : <div style={{color: "white"}} className="c_o"></div>}
                    </div>
                    <button 
                  className="btn1" 
                  onClick={() => setSummary(true)}><span onClick={() => handleView(data)} className="material-symbols-outlined"><img src="/images/eyebutton.jpg"/></span></button>
                    </div>
                )
            })}
                  
                </div>
        </div> }
        {!orderhistory &&  <div className="content">
        <p className="orderno">Order | 0</p>
        <div className="create_search">
        <input type="search" className="search"/>
        <img className='magnifines' src="/images/search.png" alt=""/>
        </div>
        <div className="create_order">
            <p>No Order Available</p>
            <Link to ="/create-order"><button>Create</button></Link>
        </div>
        </div>
        }
        { summary && <SummaryPage viewdatasummary={viewdata} closeSum={setSummary}/>}
        <SideBar/>
        <FooterSecond/>

        </>
    )

}
export default OrderPage;