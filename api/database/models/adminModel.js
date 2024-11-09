const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
  username:{
    type:String,
    default:"admin"
  },
  password:{
    type:String,
    default:"admin"
  }
})

const adminModel = mongoose.model("admin",adminSchema)
module.exports = adminModel;