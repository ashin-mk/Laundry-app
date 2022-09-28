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
    const [issearch,setisSearch]=useState(false)
    const [search,setSearch]=useState("")
    const [filtercity,setFilterCity]=useState()
    const [sort,setSort]=useState(false)
    const [isfilter,setIsfilter]=useState(false)
    const [orderData, setOrderData] = useState([]);
    const [date,setdate]=useState(true)
    const Authtoken=localStorage.getItem("authorization")
    const [orderhistory,setorderhistory]=useState(false)
    const [viewdata, setViewdata] = useState([]);
    const month=["January","February","March","April","May","June","July","August","September","October","November","December"]
    useEffect(() => {
        axios({
            method:'GET',
            url:'http://localhost:3001/create-order',
            headers:{
                authorization:Authtoken
            }
        })
            .then((datas) => {
                if(datas.data.length){
                    setorderhistory(true)
                    setOrderData(datas.data)
                }
                })
    }, [date])
    const handleView = (data) =>{
        setViewdata(data);
        
    }
    const handleSort=(k)=>{
        setSort(!sort)
      if(k==="LtoH"){
        orderData.sort(function(a,b){
        
            if(a.price>b.price){
                return 1
            }else if(a.price<b.price){
                
                return -1
            }else{   
                return 0
            }
        })
      }else if(k==="HtoL"){
        orderData.sort(function(a,b){
            if(a.price>b.price){
                return -1
            }else if(a.price<b.price){       
                return 1
            }else{    
                return 0
            }
        })
       
      }else if(k==="itemsH"){
        orderData.sort(function(a,b){
            if(a.items.length>b.items.length){
                return -1
            }else if(a.items.length<b.items.length){
                return 1
            }else{
                return 0
            }
        })

      }else{
        orderData.sort(function(a,b){
            if(a.items.length>b.items.length){
                return 1
            }else if(a.items.length<b.items.length){
                return -1
            }else{
                return 0
            }
        })

      }
    }
    const handleSearch=(e)=>{
setSearch(e.target.value)
        if(search.length){
            setisSearch(true)
        }
        console.log(search)
    }
    return (
        <>
       
       {orderhistory && 
       <div>
       <HeaderP2/>
       <div id="sortby">Sort By
       <ul >
       <li onClick={()=>setdate(!date)}>Date</li>
        <li onClick={()=>handleSort("LtoH")} >Price : L-H</li>
        <li onClick={()=>handleSort("HtoL")} >Price : H-L</li>
        <li onClick={()=>handleSort("itemsH")}>Items : L-S</li>
        <li onClick={()=>handleSort("itemsL")}>Items : S-L</li>
       </ul>
       </div>
       <p className="orderv">Order | {orderData.length}</p>
       <Link to="/create-order"><button className="create">Create</button></Link>
        <div className="class">
        <img className='magnifine' src="/images/search.png" alt=""/>
        <input type="number" onChange={(e)=>handleSearch(e)} className="search"/>
        </div>
        <div className="order">
        
        <table >
            <thead>
            <tr className="order_table" style={{border: "none"}}>
                <th style={{width:"110px"}}>
                    Order Id
                </th>
                <th style={{width:"190px"}} className="filterDate">
                    Order Date & Time
                    <ul>
                        {
                            month.map((k,i)=>{
                                return(
                                    <li key={i} onClick={()=>{setIsfilter(true) ; setFilterCity(k)}} >
{k}
                                    </li>
                                )
                            })
                        }
                        
                    </ul>
                    
                </th>
                <th style={{width:"155px"}} >
                    Store Location
                </th>
                <th style={{width:"128px"}} className="filtercity">
                    City
                    <ul className="filtercityul">
                        <li onClick={()=>{setFilterCity("Jp Nagar");setIsfilter(true)}}>Jp Nagar</li>
                        <li onClick={()=>{setFilterCity("Alkapuri");setIsfilter(true)}}>Alkapuri</li>
                        <li onClick={()=>{setFilterCity("Pink City");setIsfilter(true)}}>Pink City</li>
                    </ul>
                </th>
                <th style={{width:"180px"}}>
                    Store Phone
                </th>
                <th style={{width:"120px"}}>
                    Total Price
                </th>
                <th style={{width:"100px"}}>
                    Price
                </th>
                <th style={{width:"130px"}}>
                    Status
                </th>
                <th style={{width:"140px"}}>

                </th>
                <th style={{width:"70px"}}>
                    View
                </th>
            </tr>
            </thead>
            <tbody>
            {issearch===false && orderData.map((data, index)=>{
                if(isfilter===true && filtercity!==data.storeInfo.name && data.dateTime.includes(filtercity)===false){
                return
                }
                return(

                    <tr key={index} className="order_data">
                    <td className="order_p" style={{width: "80px"}}>
                    {data.orderId}
                    </td>
                    <td className="order_p" style={{width: "180px"}}>
                    {data.dateTime}
                    </td>
                    <td className="order_p" style={{width: "150px"}}>
                    {data.storeInfo.address}
                    </td>
                    <td className="order_p" style={{width: "120px"}}>
                    {data.storeInfo.name}
                    </td>
                    <td className="order_p" style={{width: "180px"}}>
                    {data.storeInfo.phone}
                    </td>
                    <td className="order_p" style={{width: "100px"}}>
                    {data.price}
                    </td>
                    <td className="order_p" style={{width: "90px"}}>
                    {data.price-90}
                    </td>
                    <td className="order_p" style={{width: "120"}}>
                    {data.status}</td>
                    { data.status === "Ready to pickup" && <td style={{color: "red",width:"120px"}} className="c_o">Cancel Order</td>}
                    {data.status !=="Ready to pickup" && <td style={{color: "white",width:"120px"}} className="c_o"></td>}
                    <td
                  className="btn1" 
                  onClick={() => setSummary(true)}><span onClick={() => handleView(data)} className="material-symbols-outlined"><img src="/images/eyebutton.jpg" style={{height:"25px",width:"32px",marginTop:"12px"}}/></span></td>
                    </tr>
                  
                )
            }
            
            )}
            {issearch===true && orderData.map((data, index)=>{
                if(isfilter===true && filtercity!==data.storeInfo.name && data.dateTime.includes(filtercity)===false){
                    return
                    }
                if(data.orderId.includes(search)){ 
                return(
         <tr key={index} className="order_data">
                    <td className="order_p" style={{width: "80px"}}>
                    {data.orderId}
                    </td>
                    <td className="order_p" style={{width: "180px"}}>
                    {data.dateTime}
                    </td>
                    <td className="order_p" style={{width: "150px"}}>
                    {data.storeInfo.address}
                    </td>
                    <td className="order_p" style={{width: "120px"}}>
                    {data.storeInfo.name}
                    </td>
                    <td className="order_p" style={{width: "180px"}}>
                    {data.storeInfo.phone}
                    </td>
                    <td className="order_p" style={{width: "100px"}}>
                    {data.price}
                    </td>
                    <td className="order_p" style={{width: "90px"}}>
                    {data.price-90}
                    </td>
                    <td className="order_p" style={{width: "120"}}>
                    {data.status}</td>
                    { data.status === "Ready to pickup" && <td style={{color: "red",width:"120px"}} className="c_o">Cancel Order</td>}
                    {data.status !=="Ready to pickup" && <td style={{color: "white",width:"120px"}} className="c_o"></td>}
                    <td
                  className="btn1" 
                  onClick={() => setSummary(true)}><span onClick={() => handleView(data)} className="material-symbols-outlined"><img src="/images/eyebutton.jpg" style={{height:"25px",width:"32px",marginTop:"12px"}}/></span></td>
                    </tr>
            
                )}
            })}
          </tbody>
            </table>
            <div>
                </div>
        </div>
        </div> }
        {!orderhistory && 
        <div>
        <HeaderP2/>
        <div className="content">
        <p className="orderno">Order | 0</p>
        <div className="create_search">
        <input type="search" className="search"/>
        <img className='magnifine' src="/images/search.png" alt="" style={{display:"none"}}/>
        </div>
        <div className="create_order">
            <p>No Order Available</p>
            <Link to ="/create-order"><button>Create</button></Link>
        </div>
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