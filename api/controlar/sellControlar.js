const sellColl = require("../database/models/sellModel")


// add new sell
const addSell = async (req,resp)=>{
  const sell = new sellColl(req.body);
  try{
    const addedSell = await sell.save()
    if(addedSell && addedSell._id){
      resp.status(200).json({
      state:true,
    })
    }else{
      resp.status(500).json({
      state:false,
      msg:"can't add!"
    })
    }
  }catch(err){
    resp.status(500).json({
      state:false,
      msg:"can't add,may server error!"
    })
  }
}


// get all sell
const getAllSell = async (req,resp)=>{
  try{
    const allSells = await sellColl.find();
    if(allSells && allSells.length > 0){
      resp.status(200).json({
      state:true,
      data:allSells
    })
    }else{
      resp.status(500).json({
      state:false,
      msg:"Not added any sell!"
    })
    }
  }catch(err){
    console.log(err)
    resp.status(500).json({
      state:false,
      msg:"Server error!"
    })
  }
};




module.exports = {
  addSell,
  getAllSell
}