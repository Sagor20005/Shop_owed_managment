import React, { useState,  useRef,  useEffect} from 'react'
import "./OwedList.css"
import Icons from "../Icons.json"
import {  useNavigate} from 'react-router-dom'
import Owed from "./Owed"

const Content = ()=> {
  const Navigate = useNavigate()
  // content element html
  let contentElement = useRef()
  // this ig page state var change the varuable
  //after change any data else not work this page properly
  const [pageLog,
    setLog] = useState( {
      getOwed: false,
      OwedPeoples: false
    })
  // All Owed people
  const [OwedPeoples,
    setPeoples] = useState([])

  // chang page state work
  useEffect(()=> {
    function styleContentElement() {

      if (!pageLog.OwedPeoples) {
        contentElement.current.style.display = "flex"
        contentElement.current.style.justifyContent = "center"
        contentElement.current.style.alignItems = "center"
        contentElement.current.style.height = "100%"
      } else {
        if (window.innerWidth >= 1048) {
          contentElement.current.style.display = "flex"
          contentElement.current.style.justifyContent = "flex-start"
          contentElement.current.style.alignItems = "flex-start"
          contentElement.current.style.flexWrap = "wrap"
          contentElement.current.style.gap = "10px"
          contentElement.current.style.height = "auto"
        } else {
          contentElement.current.style.display = "block"
          contentElement.current.style.height = "100%"
        }
      }
    }
    styleContentElement()
  },
    [pageLog])

  useEffect(()=> {
    async function getCastumar() {
      try {
        let result = await fetch(`${process.env.REACT_APP_API}/owed/people/`)
        result = await result.json()
        console.log(result)
        if (result && result.state) {
          setPeoples(result.data)
          setLog({
            getOwed: true, OwedPeoples: true
          })
        } else {
          setLog({
            getOwed: true, OwedPeoples: false
          })
        }
      }catch(err) {
        console.log(err)
        setLog({
          getOwed: true, OwedPeoples: false
        })
      }
    }
    getCastumar()
  },
    [])

  return(
    <>
      {
      <div ref={contentElement} className="content">

        {
        (pageLog.getOwed && !pageLog.OwedPeoples ? <h2 className="empty">Not added any data.</h2>: (!pageLog.getOwed && !pageLog.OwedPeoples ? <h2 className="empty">Getting Owed...</h2>: null))
        }
        {
        OwedPeoples.map((people)=> {
          return(
            <Owed data={people} />
          )
        })
        }
        <img onClick={()=>Navigate("/addowed",{state:{action:"add"}})} className="add_people" src={Icons.add} alt="New" />
    </div>
    }
  </>
);
};
export default Content