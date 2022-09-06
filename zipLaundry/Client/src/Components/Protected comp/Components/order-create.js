import React, {useState} from "react";
// import { Link } from "react-router-dom";
import "./order-create.css"
import SummaryPg from "./summaryPg";
import ItemRows from "./productRows";
import HeaderP2 from "./headerP2";
import SideBar from "./sidebar"
import FooterSecond from "./footerP2";

const OrderBody = ()=>{
const [sumpop, setSumpopUp] = useState(false);
const [issearch,setisSearch]=useState(false)
const [search,setSearch]=useState("")
// const [trigger, setTrigger] =useState(false);
const ProductArray = [
    {
      name: "Shirt",
      image: "shirt.jpg",
    },
    {
      name: "T-Shirts",
      image: "t-shirt.jpg",
    },
    {
      name: "Trousers",
      image: "trouser.jpg",
    },
    {
      name: "Jeans",
      image: "jeans.jpg",
    },
    {
      name: "Boxers",
      image: "boxer.jpg",
    },
    {
      name: "Joggers",
      image: "jogger.jpg",
    },
    {
      name: "Others",
      image: "others.jpg",
  },
];
const initialState ={};
for(let i=0; i< ProductArray.length;i++){
  let name =ProductArray[i].name;
  initialState[name]={
    quantity :"",
    washType :[false, false, false, false],
    price :0,
  };
}
const [orderDetails ,setOrderDetails] = React.useState(initialState);
const [modifyOrderDetail , setModifyOrderDetail] =React.useState([]);

const handleProceed=()=>{
  if(modifyOrderDetail.length !==0){
    setSumpopUp(prevState =>({...prevState, sumpop:true}))
  }else{
    alert("Please Select some items")
  }
}

React.useEffect(()=>{
  //console.log(orderDetails)
  //console.log(modifyOrderDetail);
  setModifyOrderDetail([]);
  Object.keys(orderDetails).forEach(key => {
    // console.log(modifyOrderDetail);
    let obj ={};
    if(orderDetails[key].price !==0){
      obj.name =key;
      obj.price = orderDetails[key].price;
      obj.quantity = orderDetails[key].quantity;
      obj.washType = orderDetails[key].washType;
      setModifyOrderDetail(prevDetail =>([...prevDetail, obj]))
      //console.log(modifyOrderDetail);
    }

  })
},[orderDetails])
  return(
    <>
    <HeaderP2/>
    <div id="orderPg">
      <div className="container">
          <p className="orderno">Create Order</p>
          <div className="searchBox">
              <img className='magnifine' src="/images/search.png" alt=""/>
              <input id="searchInput" type='text' onChange={(e)=>{setisSearch(true),setSearch(e.target.value)}} />
          </div>
      </div>
    
      <div id="product">
          <div id="head-row">
              <div id="item1">Product Type</div>
              <div id="item2">Quantity</div>
              <div id="item3">Wash Type</div>
              <div id="item4">Price</div>
          </div>
          {ProductArray.map(item =>{
          if(issearch===true && item.name.includes(search)===false){
            return
          } return(<ItemRows 
            info={item}
            key={item.name} 
            setOrderDetails={setOrderDetails}
            orderDetails={orderDetails}
            setModifyOrderDetail={setModifyOrderDetail}
            modifyOrderDetail={modifyOrderDetail}
           />)})}
          
          <div className="B-container">
              <button className="button">Cancel</button>
              <button className="button"onClick={() => handleProceed()}>Proceed</button>
              {/* <button className="button"onClick={()=>{setSumpopUp(true)}}>Proceed</button> */}
          </div>   
          

      </div>
    </div>
   
    {sumpop && <SummaryPg closeSumPg={setSumpopUp} orderDetails={modifyOrderDetail}/>}
     <SideBar/>
        <FooterSecond/>
   
    </>
  )
}

 export default OrderBody;