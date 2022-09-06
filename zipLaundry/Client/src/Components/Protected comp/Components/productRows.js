import React from 'react'
import "./order-create.css"

const ItemRows = (props) => {

  
 
  const [itemPriceDetail, setItemPriceDetail] =React.useState({
    itemPrice :0,
    PerItemPrice :0,
  })
  const handleChange =(e)=>{
    const {value} =e.target;
    
    props.setOrderDetails(prevDetail =>{
      return {...prevDetail, [props.info.name]: {...prevDetail[props.info.name], quantity: value}}
    })
  }
  const handleImageClick=(e)=>{
    
    let index = Number(e.target.attributes.index.value)
    props.setOrderDetails(prevDetail =>{
      let newWashType =[...prevDetail[props.info.name].washType];
      newWashType[index] = !newWashType[index];
      return{
        ...prevDetail,[props.info.name]:{...prevDetail[props.info.name], washType:newWashType}
      }
    })
    // console.log(props.orderDetails[props.info.name])
    
  }

  const typePrice ={
    Shirt :[10, 10, 15, 20],
    "T-Shirts" : [10, 10, 15, 20],
    Trousers : [15, 15, 20, 25],
    Jeans : [20, 20, 25, 30],
    Boxers : [15, 15, 20, 25],
    Joggers : [20, 20, 25, 30],
    Others : [25, 25, 30, 30],
  }
//   const Prices =new Map([
//     ["Shirt" ,[10, 10, 15, 20]],
//   ["T-Shirts" , [10, 10, 15, 20]] ,
//    ["Trousers" , [15, 15, 20, 25]],
//   [ "Jeans", [20, 20, 25, 30]],
//    ["Boxers" , [15, 15, 20, 25]],
//    ["Joggers" , [20, 20, 25, 30]],
//    ["Others" , [25, 25, 30, 30]],
// ])

const CalculatorPrice =()=>{

  let pricePerItem=0, itemPriceTotal=0;
  props.orderDetails[props.info.name].washType.map((val,i)=>{
  pricePerItem += Number(val) * typePrice[props.info.name][i];
})
  itemPriceTotal = pricePerItem * Number(props.orderDetails[props.info.name].quantity)
  // console.log(itemPriceTotal);

  return [pricePerItem, itemPriceTotal];
}
    
React.useEffect (()=>{
  //CalculatorPrice();
  let [PerItemPrice , itemPrice] =CalculatorPrice();
  //console.log(itemPrice ,PerItemPrice);
  setItemPriceDetail({
    itemPrice :itemPrice,
    PerItemPrice :PerItemPrice,
  })
  // console.log(itemPriceDetail)
  props.setOrderDetails(prevDetail =>({...prevDetail, [props.info.name]: {...prevDetail[props.info.name], price : itemPrice}}))
},[...props.orderDetails[props.info.name].washType, props.orderDetails[props.info.name].quantity])  


  function HandleReset(){
    setItemPriceDetail({
      itemPrice :0,
      PerItemPrice :0,
    })
    props.setOrderDetails(prevDetail =>({...prevDetail, [props.info.name]: {
          quantity :"",
          washType :[0, 0, 0, 0],
          price :0,
        }}));
  }

  return(
    <>
    <div id="item-row">
      <div className="imageDivision">
        <img  className="itemImg"  src={`/images/${props.info.image}`} alt=""/>
        <div className="para">
          <p><b>{props.info.name}</b></p>
          <p style={{ "fontSize":"11px", "color":"#76788B", "marginTop":"-5px"}}>Lorem Ispum is simple</p>
        </div>
      </div>
      
      <div className="inputDivision">
        <div className="inputNum">
          <input className="quantityNum" type="text"
          name='quantity'

          value={props.orderDetails[props.info.name].quantity} 
          style={{ border: "none" }}  
           onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="washDivision">
        <img alt=""
          className="washImg" 
          index ="0"
          src={`/images/${props.orderDetails[props.info.name].washType[0] ? "blue-washing.svg" : "washing-machine.png"}`} 
          onClick={handleImageClick}
        />
        <img  alt=""
          className="washImg" 
          index ="1"
          src={`/images/${props.orderDetails[props.info.name].washType[1] ? "blue-ironing.svg" : "iron.png"}`} 
          onClick={handleImageClick}
        />
        <img  alt=""
          className="washImg" 
          index ="2"
          src={`/images/${props.orderDetails[props.info.name].washType[2] ? "towel.svg" : "dry-wash.png"}`} 
          onClick={handleImageClick} 
        />
        <img alt=""
          className="washImg" 
          index ="3"
          src={`/images/${props.orderDetails[props.info.name].washType[3] ? "blue-bleach.svg" : "bleach.png"}`}  
          onClick={handleImageClick}
        />

      </div>
      <div>
        <div>
          {itemPriceDetail.itemPrice ?
          <div className="price">
            <div className='PerItemTotalPrice'>
              {(props.orderDetails[props.info.name].quantity) + "X" + itemPriceDetail.PerItemPrice} =
            </div>
            <div className="itemPrice">
                {itemPriceDetail.itemPrice}
            </div>

          </div>:"__"}
        </div>
      </div>
      {itemPriceDetail.itemPrice ? <button className="resetButton" onClick={()=> {HandleReset()}}>Reset</button> : ""}
      {/* <div className="price">
        <p>___</p>
      </div> */}
    </div>
    </>
  )
    
}
 export default ItemRows;