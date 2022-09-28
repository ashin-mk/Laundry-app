import React, { useEffect, useState } from "react";
import axios from 'axios';
import ConfirmationPop from "./confirmation";
import './summaryPg.css';


const SummaryPg = (props) => {
    // console.log(props.orderDetails)
    // console.log(props)
    const Token = localStorage.getItem("authorization")
    // console.log(Token)

    const [userData, setUserData] = useState([])
    const [storedetails,setstoredetails]=useState(false)
    // console.log(userData)
    useEffect(() => {
        fetch("http://localhost:3001/user", {
            headers: {
                authorization: Token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUserData(data.user)
                // console.log(data.user)
            });
    }, [Token]);

    //   console.log(userData[0].Address[0])


    const orderId = Math.floor(1000 + Math.random() * 1000);



    const [trigger, setTrigger] = useState(false);
    const [orderFinalDetail, setOrderFinaldetail] = useState({
        dateTime: "",
        storeInfo: "",
        userAddress: "",
        status: "",
        items: "",
    })
    if (trigger) {
        return <ConfirmationPop orderDone={setTrigger} />
    }

    let subTotal = 0, pickUpCharge = 90, total = 0;
    props.orderDetails.forEach(item => {
        subTotal += Number(item.price)
    })
    total = subTotal + pickUpCharge;
    const actions = [
        {
            name: "Jp Nagar",
            address: "Phone booth,10th Road",
            phone: "+91 9753855624"
        },
        {
            name: "Alkapuri",
            address: "Near J-D Hall,11th strit",
            phone: "+91 8733209221"
        },
        {
            name: "Pink City",
            address: "Sindhari ,By pass",
            phone: "+91 5399511300"
        }
    ]
    const handleChange = (e) => {
        setstoredetails(true)
        setOrderFinaldetail(prevDetail => ({ ...prevDetail, storeInfo: e.target.value }))
    }
    
    const handleButton = (e) => {
        // console.log(orderFinalDetail)

        e.preventDefault();
       // closeSumPg(false)
    //    console.log(userData)
      
        // console.log(trigger);
        if(storedetails===true){
            axios({method:'POST',
            url:"http://localhost:3001/create-order",
                data:{
                    userId: userData[0].Email,
                    orderId: orderId,
                    storeInfo:JSON.parse(orderFinalDetail.storeInfo),
                    status: "Ready to pickup",
                    userAddress: userData[0].Address[0],
                    items: props.orderDetails,
                    price: total
                },
                headers : {
                 authorization: Token,
                 "Content-Type": "application/json"
                },
            }).then((res) => {
               setTrigger("true");
           
              }).catch((err) => {
               console.log("err")
              })
        }
else{
    alert("Please select store Location")
}
       
    }


    // console.log(total)


    return (
        <>
            <div id="summaryBack">
                <div id="popContainer">
                    <div className="head">
                        <p className="summaryHead"><b>Summary</b></p>

                        <button onClick={() => props.closeSumPg(false)} className="close-B"><b>X</b></button>
                    </div>
                    <div className="storeDetail">
                        <div className="location">
                            <p><b>Store Location</b></p>
                            <select name="address" onChange={handleChange} id="address">
                                <option  hidden className="disabled" defaultValue=''>Store Location</option>
                                {actions.map(store => (<option value={JSON.stringify(store)} key={store.name}>{store.name}</option>))}
                            </select>


                        </div>
                        <div className="storeAddress">
                            <p className="storeDetail"><b>Store Address</b></p>
                            <p className="storeDetail">{
                                orderFinalDetail.storeInfo !== "" ?
                                    JSON.parse(orderFinalDetail.storeInfo).address : "__"
                            }</p>
                        </div>
                        <div className="phone">
                            <p className="storeDetail"><b>PhoneNo.</b></p>
                            <p className="storeDetail">{
                                orderFinalDetail.storeInfo !== "" ?
                                    JSON.parse(orderFinalDetail.storeInfo).phone : "__"
                            }</p>
                        </div>
                    </div>

                    <div className="orderDetail">
                        <div className="ord"><p><b>Order Detail</b></p></div>
                        <div id="OrderedInfo">{props.orderDetails.map(item => (<Totalorder info={item} key={item.name}
                      
                            orderDetails={props.orderDetails} />))}</div>
                        <div id="price_foot">
                        <div className="sub_total">Sub total: <div className="Sub_val">{subTotal}</div></div>
                        <div className="pickUp">pickUp Charges: <div className="pickUp_val">{pickUpCharge}</div></div>
                        <div id="all_total_amout"><div className="All_amnt">Total:</div><div className="All_Total_val">{total}</div></div>
                        </div>

                    </div>

                    <div className="userAdd">
                        <p id="use_Add"><b>Address</b></p>
                        <div className="A-container">
                            <div className="add">
                                <p className="ho"><b>Home</b></p>
                                <div><img src="/images/tick.svg" alt=""></img></div>
                            </div>
                            {userData.length>0 && <p className="add_u">{userData[0].Address}</p> }
                                
                            
                        </div>

                    </div>
                    <div className="B-div">
                        {/* <button className="confirm-B" onClick={()=>{setTrigger(true)}}><div onClick={()=> closeSumPg(false)}>Confirm</div></button> */}
                        <button className="confirm-B" onClick={(e)=>handleButton(e)} > Confirm </button>
                    </div>
                </div>
            </div>
        </>
    )
}
const Totalorder = (props) => {

    const washType = ["washing", "ironing", "dry-wash", "bleach"];


    return (
        <>
            <div id="product-cart">
                <div className="productType">{props.info.name}</div>
                <div className="washType">
                    {

                        props.orderDetails[0].washType.map((a, i) => {
                            return <i key={i}>{a ? `${washType[i]}, ` : ""}</i>;

                        })}
                </div>
                <div className="priceType">
                    <div className="price_type">
                        {(props.info.quantity) + "X" + Number(props.info.price) / Number(props.info.quantity) + "="}
                    </div>
                    <div className="price_total">{props.info.price}</div>

                </div>

            </div>

        </>
    )
}

export default SummaryPg;


