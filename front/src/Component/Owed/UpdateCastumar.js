import React from 'react'
import "./AddOwed.css"
import Icons from "../Icons.json"
import {useNavigate} from 'react-router-dom'
// intarnul imports
import SubmitEventToObject from "../Utilities/SubmitEventToObject"

const UpdateCastumar = ()=>{
  const Navigate = useNavigate()
  
    // Submit handler
  const Submit = async (e)=>{
    e.preventDefault()
    // arenge all data in a Object
    const formData = SubmitEventToObject(e)
    
    // request server
    let result = await fetch(`${process.env.REACT_APP_API}/owed/people`,{
      method:"post",
      body:JSON.stringify(formData),
      headers:{
        "content-type":"application/json"
      }
    })
    result = await result.json()
    if(result && result.state){
      Navigate("/")
    }
  }
  
  return(
    <>
      {
        <div className="add_owed_containar">
          <form onSubmit={(e)=>Submit(e)}>
            <img onClick={()=>Navigate("/")} className="close" src={Icons.close} alt="close"/>
            <input type="text" placeholder="Enter persone name." required name="name"/>
            <input type="text" placeholder="Enter persone address." required name="address"/>
            <button type="submit">Add</button>
          </form>
        </div>
      }
    </>
    );
};
export default UpdateCastumar;