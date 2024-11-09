const peopleColl = require("../database/models/peopleModel")

const updateCastumarOwed = async (ref,sign,callback)=>{
  const oparetor = sign;
  const castumar_id = ref.castumar_id;
  const amount = ref.amount;
  try{
    // find castumar by id 
    const castumarData = await peopleColl.findOne({_id:castumar_id})
    // change data with amount
    let newOwed = castumarData.owed;
    if(oparetor === "+"){
      newOwed += amount
    }else if(oparetor === "-"){
      newOwed -= amount
      newOwed = newOwed < 0 ? 0 : newOwed
    }else{
      newOwed = 0
    }
    if(newOwed >= 0){
      const updatedOwed = await peopleColl.findOneAndUpdate({_id:castumar_id},{owed:newOwed})
      if(updatedOwed && updatedOwed._id){
        callback(null,"success")
      }else{
        callback("castumar owed can't update!",null)
      }
    }else{
      callback("sign error",null)
    }
  }catch(err){
    callback("syntex error!",null)
  }
}
module.exports = updateCastumarOwed