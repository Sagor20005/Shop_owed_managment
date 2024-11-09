import React from 'react'
import {Routes,Route} from 'react-router-dom'

// Component import
// owed component
import OwedList from "./Owed/OwedList"
import SelectedOwed from "./Owed/SelectedOwed"
import AddOwed from "./Owed/AddOwed"
import AddOwedDetials from "./Owed/AddOwedDetials"
// sell import
import Sell from "./Sell/Sell"
// Auth
import Login from './Auth/Login.js'
import ChangeAdmin from './Auth/ChangeAdmin.js'

import PrivetComponent from "./PrivetComponent"

const Content = ()=>{
  return(
    <>
      {
    <div className="content">
      <Routes>
        <Route element={<PrivetComponent/>}>
          {/*Owed Routes*/}
          <Route path="/" element={<OwedList />}/>
          <Route path="/owed" element={<SelectedOwed />}/>
          <Route path="/addowed" element={<AddOwed />}/>
          <Route path="/addoweddtl" element={<AddOwedDetials />}/>
          {/*Sell Routes*/}
          <Route path="/sell" element={<Sell />}/>
          {/*Auth Routes*/}
          <Route path="/change-admin" element={<ChangeAdmin />}/>
        </Route>
        {/*Auth Routes*/}
        <Route path="/login" element={<Login />}/>
        
        
        
      </Routes>
    </div>
      }
    </>
    );
};
export default Content;