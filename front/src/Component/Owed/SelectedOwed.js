import React, {  useEffect,  useState} from 'react'
import "./SelectedOwed.css"
import Icons from "../Icons.json"
import {  useNavigate,  useLocation} from 'react-router-dom'
import Swal from "sweetalert2"

import CountTotalOwed from "../Utilities/TotalAmountCount"
import Confrom from "../Utilities/Confrom"

const SelectedOwed = ()=> {
  const Navigate = useNavigate()
  const location = useLocation()
  const castumarId = location.state.id

  // page log alert
  const [log,
    setLog] = useState("")

  // all oweds
  const [oweds,
    setOweds] = useState([])
  // calculeted owed
  const [owedAmount,
    setOwedAmount] = useState(0)
  const [totalOwed,
    setTotal] = useState(0)

  // Get all owed
  useEffect(()=> {
    async function getOwed () {
      try {
        let result = await fetch(`${process.env.REACT_APP_API}/owed/${castumarId}`)
        result = await result.json()
        if (result && result.state) {
          setOweds(result.data)
          // count total owed
          setOwedAmount(CountTotalOwed(result.data, null))
          setTotal(CountTotalOwed(result.data, true))
        } else {
          // alert nided
        }
      }catch(err) {
        console.log(err)
      }
    }
    getOwed()

  },
    [log])


  const OwedClose = async ({id,castumar_id,amount})=> {
    const updateData = {
      condition: {_id: id },
      data: {is_paid: true},
      ref: {
        castumar_id: castumar_id,
        amount: amount
      }
    }
    
    Confrom("paid",async (isOk)=>{
      if(isOk){
        try{
          let result = await fetch(`${process.env.REACT_APP_API}/owed`,
            {
              method: "put",
              body: JSON.stringify(updateData),
              headers: {
                "content-type": "application/json"
              }
            })
          result = await result.json()
          console.log(result)
          if (result && result.state) {
            // notify
            setLog(`${Date.now()}`)
          } else {
            Swal.fire({
              title:"Error",
              text:"Can't save paid!",
              icon:"error"
            })
          }
        }catch(err){
          console.log(err)
          Swal.fire({
            title:"Error",
            text:"No network!",
            icon:"error"
          })
        }
      }
    })
   
  };

// delete owed detels
  const OwedDelete = async (id,castumar_id,amount)=> {
    
    Confrom("delete",async (isTrue)=>{
      if(isTrue){
        try{
          let result = await fetch(`${process.env.REACT_APP_API}/owed`,
          {
            method: "delete",
            body: JSON.stringify({
              _id: id, castumar_id, amount
            }),
            headers: {
              "content-type": "application/json"
            }
          })
        result = await result.json()
        if (result && result.state) {
          // notify
          setLog(`${Date.now()}`)
        } else {
          Swal.fire("can't delete!")
        }
        }catch(err){
          console.log(err)
        }
      }
    })
   }


//  Delete castumar 
const deleteCastumar = (id)=>{
  const action = "delete"
  Confrom(action, async (isOk)=>{
    if(isOk){
      try{
        let result = await fetch(`${process.env.REACT_APP_API}/owed/people/`,{
          method:"delete",
          body:JSON.stringify({_id:id}),
          headers:{
            "content-type":"application/json"
          }
        })
        result = await result.json()
        if(result && result.state){
          Navigate("/")
        }else{
          Swal.fire({
            title:"Error",
            text:result.msg,
            icon:"error"
          })
          Navigate("/")
        }
      }catch(err){
        console.log(err)
        Swal.fire({
            title:"Error",
            text:"No network!",
            icon:"error"
          })
      }
    }
  })
}


return(
<>
  {
    <div className="selectedOwed">

      <div className="selectedOwed_topbar">
        <img onClick={()=>Navigate("/")} src={Icons.close} alt="back" />
        <h3>{location.state.name}</h3>
        <img onClick={()=>deleteCastumar(castumarId)} src={Icons.delete} alt="delete"/>
        <img onClick={()=>Navigate("/addowed",{state:{action:"update",id:castumarId}})} src={Icons.edit} alt="edit"/>
      </div>


      <div className="owedTaka">
        <h2>{owedAmount}৳</h2>
        <h4>privous owed {totalOwed}৳</h4>
      </div>
      <hr color="#4b7cbd" />

      <div className="owed_list">


      {
        oweds.map((owed)=> {
          return(

          <div style={ { color: owed.is_paid ? "#1dff1d": "white" }} className="owed_details">

              <div className="owed_product">
                <h4>{owed.product}</h4>
                <p>
{owed.pises} pis
</p>
              </div>

              <div className="owed_date_money">
                <h4>{owed.amount}</h4>
                <p>
                {new Date(owed.owed_date).toString().slice(0, 25)}
                </p>
              </div>

              <div className="action_btns">
                <img onClick={()=>OwedDelete(owed._id, owed.castumar_id, owed.amount)} src={Icons.delete}
                alt="delete" />

              {
                owed.is_paid ? null: <img onClick={()=>OwedClose( { id: owed._id, castumar_id: owed.castumar_id, amount: owed.amount })} src="https://img.icons8.com/?size=100&id=41905&format=png&color=000000" alt="paid" />
              }

              </div>

            </div>

            )
          })
          }




          </div>

            <img onClick={()=>Navigate("/addoweddtl", { state: { id: castumarId }})} className="add_owed" src={Icons.add} alt="New" />

          </div>
        }
    </>
  );
};
export default SelectedOwed;