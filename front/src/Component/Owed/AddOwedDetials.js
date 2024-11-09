import React from 'react'
import "./AddOwed.css"
import Icons from "../Icons.json"
import Swal from "sweetalert2"
import {useNavigate,useLocation} from 'react-router-dom'

// intarnul imports
import SubmitEventToObject from "../Utilities/SubmitEventToObject"

const AddOwedDetials = ()=>{
  const Navigate = useNavigate()
  let location = useLocation()
  
  
    // Submit handler
  const Submit = async (e)=>{
    e.preventDefault()
    // arenge all data in a Object
    let formData = SubmitEventToObject(e)
    formData.castumar_id = (location.state.id)
    formData.owed_date = Date.now()
    try{
      let result = await fetch(`${process.env.REACT_APP_API}/owed/`,{
        method:"post",
        body:JSON.stringify(formData),
        headers:{
          "content-type":"application/json"
        }
      })
      result = await result.json()
      if(result && result.state){
        Navigate("/owed",{state:{id:location.state.id}})
      }else{
        Swal.fire("can't add!")
      }
    }catch(err){
      console.log(err)
    }
  }
  
  return(
    <>
      <div className="add_owed_containar">
          <form onSubmit={(e)=>Submit(e)}>
            <img onClick={()=>Navigate("/")} className="close" src={Icons.close} alt="close"/>
            <input type="text" placeholder="products : Napa,Tofe..." name="product"/>
            <input type="number" placeholder="2pis, 4pis." name="pises"/>
            <input type="Number" placeholder="Enter Ammount." name="amount"/>
            <button type="submit">Add</button>
          </form>
        </div>
    </>
    );
};
export default AddOwedDetials;