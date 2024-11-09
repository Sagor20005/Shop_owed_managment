import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import {useCookies} from "react-cookie"

const PrivetComponent = ()=>{
  const [cookies] = useCookies([process.env.REACT_APP_COOKIE])
  
  const auth = cookies[process.env.REACT_APP_COOKIE];
  
  return auth ? <Outlet/> : <Navigate to="/login"/>
};
export default PrivetComponent;