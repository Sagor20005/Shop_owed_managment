import React from 'react'
import "../Owed/AddOwed.css"
import Icons from "../Icons.json"
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2"
// intarnul imports
import SubmitEventToObject from "../Utilities/SubmitEventToObject"

const ChangeAdmin = ()=>{
  const Navigate = useNavigate()
  
    // Submit handler
  const Submit = async (e)=>{
    e.preventDefault()
    // arenge all data in a Object
    const formData = SubmitEventToObject(e)
    try{
      let result = await fetch(`${process.env.REACT_APP_API}/auth/`,{
        method:"put",
        body:JSON.stringify(formData),
        headers:{
          "content-type":"application/json"
        }
      })
      result = await result.json()
      if(result && result.state){
        Navigate("/")
      }else{
        Swal.fire({
          title:"Error!",
          text:result.msg,
          icon:"error"
        })
      }
    }catch(err){
      Swal.fire({
        title:"Error!",
        text:"No Network!",
        icon:"error"
      })
    }
  }
  
  return(
    <>
      {
        <div className="add_owed_containar">
          <form onSubmit={(e)=>Submit(e)}>
            <img onClick={()=>Navigate("/")} className="close" src={Icons.close} alt="close"/>
            <input type="text" placeholder="Enter old username." required name="old_username"/>
            <input type="text" placeholder="Enter old password." required name="old_password"/>
            <input type="text" placeholder="Enter username." required name="username"/>
            <input type="text" placeholder="Enter password." required name="password"/>
            <button type="submit">Change.</button>
          </form>
        </div>
      }
    </>
    );
};
export default ChangeAdmin;