import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Logoutcomp = () => {
    const navigate=useNavigate()
    const logout=()=>{
        localStorage.setItem("authorization","")
        localStorage.setItem("username","")
        navigate("/Signin")
    }
    useEffect(()=>{
logout()
    },[])  
  return (
    <div>
    </div>
  )
}

export default Logoutcomp