const adminColl = require("../database/models/adminModel.js")

const defaultAdmin = async ()=> {

  await adminColl.findOne({}).then(async(res)=> {
    if (!res) {
      await new adminColl( {}).save()
      .then(()=>console.log("default admin created.."))
      .catch((err)=>console.log(err))
    }
  }).catch((err)=>{
    console.log(err)
  })

}

module.exports = defaultAdmin;