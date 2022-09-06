import React from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
    const token=localStorage.getItem("authorization")
  return (
    <div>
{token.length? children: <Navigate to="/Signin" />}
    </div>
  )
}

export default Protected