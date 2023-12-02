import React, { useState }from 'react'
import "./Register.css"
import axios from 'axios'
import UrlGEn,{config} from '../../UrlGEn'
const Register = (props) => {
  const [termsandcondition,settermsandcondition]=useState("terms-false")
  const [data,setdata]=useState({})
  const [emaivalidation,setemailvalidation]=useState(true)
  const [numberValidation,setnumberValidation]=useState("number-validity-true")
  const [emailerror,setemailerror]=useState("emailexist-false")

  const [loading,setLoading]=useState(false)
  const [numbererror,setnumbererror]=useState("numberexist-false")
  const District=["Malappuram","Calicut","Idukki","Kottayam","Wayanad","Coimbathure","Chennai","Bengaluru","Hyderabad","Mumbai","Manglore"]
  const States=["Kerala","Karnataka","Tamil Nadu", "Maharashtra","Andra Pradesh","Gujarath","Punjab"]
  const handleRegister=(e)=>{
    e.preventDefault()
    if((data.Phone+"").length===10  &&data.Email.includes('@gmail.com')){
      setLoading(true)
 axios({
  method:"POST",
  data:data,
  url:UrlGEn("Register"),
  ...config
 })
    .then(()=>{
      setLoading(false)
      props.handlepopup(true)
    })
  .catch((err)=>{
    setLoading(false)
  if(err.response.data==="EmailExist"){
setemailerror("emailexist-true")
setTimeout(()=>{
  setemailerror("emailexist-false")
},10000)

  }
  if(err.response.data==="PhoneExist"){
    setnumbererror("numberexist-true")
    setemailerror("emailexist-false")
    setTimeout(()=>{
      setnumbererror("numberexist-false")
    },10000)
  
  }
  })
}else{
  if((data.Phone+"").length!==10){
    setnumberValidation("number-validity-false")
    setTimeout(()=>{
      setnumberValidation("number-validity-true")
    },8000)
  }else{
    setemailvalidation(false)
    setTimeout(()=>{
      setemailvalidation(true)
    },8000)
  }
}
}
  const handleFormData=(e,id)=>{
setdata({...data,[id]:e.target.value})
  }
  const checkInputs=()=>{
    let c=0
    for(let key in data){
    let value=data[key]
if(value.length){
  c++
}
    }
    return c
  }

  const getbuttonClass=()=>{
    if(termsandcondition==="terms-false"){
      settermsandcondition("terms-true")
      return 
    }
    settermsandcondition("terms-false")
    return 
  }
  return (
    <div id='Register-comp'>
       <div id='Heading-register'>
        register
      </div>
      <form >
        <div className='grid'>
        <div className='grid-cell'>
  <label className="Label-register"  htmlFor="Name-register">Name</label>
<input  type="text" required id="Name-register" onChange={(e)=>handleFormData(e,"Name")} />
<div className='blue-line-register'></div>
</div>
<div className='grid-cell'>
<label className="Label-register"  htmlFor="Email-register">Email</label>
<input  type="email" required id="Email-register" onChange={(e)=>handleFormData(e,"Email")}/>
<p className={emailerror}>Email already exist</p>
{emaivalidation && <div className='blue-line-register'></div>}
{!emaivalidation &&
<div>
 <p style={ {position:"absolute",top:"180px", left:"800px" ,color:"red"}}>Enter a Valid Email</p>
 <div className='blue-line-register' style={{backgroundColor:"red"}}></div>
 </div>
 }
</div>
<div className='grid-cell'>
<label className="Label-register" htmlFor="Phone-register">Phone</label>
<input  type="number" required id="Phone-register" onChange={(e)=>handleFormData(e,"Phone")}/>
{numberValidation==="number-validity-true"  && 
<div className='blue-line-register'></div>
}
{numberValidation!=="number-validity-true" &&
<div className='blue-line-register' style={{backgroundColor:"red"}}></div>
}

<p className={numberValidation}>Please enter a valid number</p>
<p className={numbererror}>Number already exist</p>
</div>
<div className='grid-cell'>
<label className="Label-register" htmlFor="Password-register">Password</label>
<input  type="password" required id="Password-register" onChange={(e)=>handleFormData(e,"Password")}/>
<div className='blue-line-register'></div>
</div>
<div className='grid-cell'>
<label className="Label-register" htmlFor="State-register">State</label>
<select   required id="State-register" onChange={(e)=>handleFormData(e,"State")}>
  <option value=""></option>
  {States.map((k)=>{
    return(
      <option value={k}>{k}</option>
    )
  })}
</select>
<div className='blue-line-register'></div>
</div>
<div className='grid-cell'>
<label className="Label-register" htmlFor="District-register">District</label>
<select  required id="District-register" onChange={(e)=>handleFormData(e,"District")}>
<option value=""></option>
{District.map((k)=>{
    return(
      <option value={k}>{k}</option>
    )
  })}
</select>
<div className='blue-line-register'></div>
</div>
<div className='grid-cell'>
<label className="Label-register" htmlFor="Address-register">Address</label>
<input  type="text" required id="Address-register" onChange={(e)=>handleFormData(e,"Address")}/>
<div className='blue-line-register'></div>
</div>
<div className='grid-cell'>
<label className="Label-register" htmlFor="Pincode-register">Pincode</label>
<input  type="number" required id="Pincode-register" onChange={(e)=>handleFormData(e,"Pincode")}/>
<div className='blue-line-register'></div>
</div>
</div>
<input type="checkbox" id='checkbox-register' required onChange={()=>getbuttonClass()}/>
<p id='Terms-register'>I agree to Terms & Condition receiving marketing and promotional materials</p>
{loading?<button className={termsandcondition} onClick={()=>{}}>Loading...</button>:<button className={termsandcondition} onClick={checkInputs()!==8?null:(e)=>handleRegister(e)}>Register</button>}
</form>
    </div>
  )
}

export default Register