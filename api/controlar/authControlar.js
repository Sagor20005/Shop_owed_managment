const adminColl = require("../database/models/adminModel")
//const jwt = require("jsonwebtoken")

const Login = async (req,resp)=>{
  try{
    const login = await adminColl.findOne(req.body);
    if(login && login._id){
      resp.status(200).json({
        state:true,
        token:"auth_success"
      })
    }else{
      resp.status(500).json({
        state:false,
        msg:"Wrong username and password!"
      })
    }
  }catch(err){
    resp.status(500).json({
      state:false,
      msg:"server error!"
    })
  }
}


// ChangeAdmin 
const ChangeAdmin = async (req,resp)=>{
  const condition ={
    username:req.body.old_username,
    password:req.body.old_password
  }
  const data = {
    username:req.body.username,
    password:req.body.password
  }
  try{
    const updatedData = await adminColl.findOneAndUpdate(condition,data);
    if(updatedData && updatedData._id){
      resp.status(200).json({
      state:true
    })
    }else{
      resp.status(500).json({
      state:false,
      msg:"Wrong username and password!"
    })
    }
  }catch(err){
    resp.status(500).json({
      state:false,
      msg:"server error!"
    })
  }
}


module.exports = {
  Login,
  ChangeAdmin
}