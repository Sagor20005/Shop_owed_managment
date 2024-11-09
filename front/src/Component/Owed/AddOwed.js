// this component use for add or update castumar

import React,{useEffect,useState} from 'react'
import "./AddOwed.css"
import Icons from "../Icons.json"
import {useNavigate,useLocation} from 'react-router-dom'
// intarnul imports
import SubmitEventToObject from "../Utilities/SubmitEventToObject"

const AddOwed = ()=>{
  const Navigate = useNavigate()
  const location = useLocation()
  const pageAction = location.state.action ? location.state.action : null
  //castumar id is ableable to store 
  const [id, setId] = useState("")
  
  useEffect(()=>{
    if(pageAction === "update"){
      setId(location.state.id)
    }
  },[])
  
    // Submit handler
  const Submit = async (e)=>{
    e.preventDefault()
    // arenge all data in a Object
    const formData = SubmitEventToObject(e)
    // if pageAction is update this time formData
    let updateData = {
      condition:{_id:id},
      data:formData
    }
    console.log(updateData)
    
    // request server
    let result = await fetch(`${process.env.REACT_APP_API}/owed/people`,{
      method:pageAction === "add" ? "post" : "put",
      body:JSON.stringify(pageAction === "add" ? formData : updateData),
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
            <input type="text" placeholder="Enter persone name." name="name"/>
            <input type="text" placeholder="Enter persone address." name="address"/>
            <button type="submit">{pageAction}</button>
          </form>
        </div>
      }
    </>
    );
};
export default AddOwed;