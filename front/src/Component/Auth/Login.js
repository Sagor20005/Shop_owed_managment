import React from 'react'
import "../Owed/AddOwed.css"
import {useNavigate} from 'react-router-dom'
import {useCookies} from "react-cookie"
import Swal from "sweetalert2"
// intarnul imports
import SubmitEventToObject from "../Utilities/SubmitEventToObject"

const Login = ()=>{
  const Navigate = useNavigate()
  const [cookies,setCookie] = useCookies([process.env.REACT_APP_COOKIE])
  
    // Submit handler
  const Submit = async (e)=>{
    e.preventDefault()
    // arenge all data in a Object
    const formData = SubmitEventToObject(e)
    
    
    try{
      let result = await fetch(`${process.env.REACT_APP_API}/auth/login/`,{
        method:"post",
        body:JSON.stringify(formData),
        headers:{
          "content-type":"application/json"
        }
      })
      result = await result.json()
      if(result && result.state){
        setCookie(process.env.REACT_APP_COOKIE,result.token,{maxAge:31557600000})
        Navigate("/")
      }else{
        Swal.fire({
          title:"Error!",
          text:result.msg,
          icon:"error"
        })
      }
    }catch(err){
      console.log(err)
      Swal.fire({
        title:"Error!",
        text:err.massage,
        icon:"error"
      })
    }
  }
  
  return(
    <>
      {
        <div className="add_owed_containar">
          <form onSubmit={(e)=>Submit(e)}>
            <input type="text" placeholder="Enter username." required name="username"/>
            <input type="password" placeholder="Enter password." required name="password"/>
            <button type="submit">Log In.</button>
          </form>
        </div>
      }
    </>
    );
};
export default Login;