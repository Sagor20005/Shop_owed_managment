const mongoose = require("mongoose")

const peopleSchema = mongoose.Schema({
  name:{
    type:String,
    default:"Anonymous"
  },
  address:{
    type:String,
    default:"Anonymous"
  },
  owed:{
    type:Number,
    default:0
  }
},{timestamps: true})

const peopleModel = mongoose.model("people",peopleSchema)

module.exports = peopleModel;