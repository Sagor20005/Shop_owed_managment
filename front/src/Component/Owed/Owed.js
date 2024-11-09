import React from 'react'
import "./Owed.css"
import {useNavigate} from 'react-router-dom'

const Owed = ({data})=> {
  const Navigate = useNavigate()
  
  const castumarId = data._id
  
  
  return(
    <>
      {
      <div onClick={()=>Navigate("/owed",{state:{id:castumarId,name:data.name}})} className="owed" key={data._id}>
        <div className="owed-logo_name">
          <div className="owed_logo">
            <h2>{data.name.slice(0,1)}</h2>
          </div>
          <div className="names">
            <h2>{data.name}</h2>
            <p>{data.address}</p>
          </div>
        </div>

        <div className="details">
          <h2>{data.owed}৳</h2>
        </div>
        
        <div className="action_btns">
          
        </div>
        
      </div>
      }
    </>
  );
};
export default Owed;