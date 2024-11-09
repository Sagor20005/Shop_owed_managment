const mongoose = require("mongoose")

const owedSchema = mongoose.Schema({
  product:{
    type:String,
    default:"no name"
  },
  pises:{
    type:Number,
    default:"0"
  },
  amount:{
    type:Number,
    default:0,
    required:true
  },
  castumar_id:{
    type:String,
    required:true
  },
  is_paid:{
    type:Boolean,
    default:false
  },
  owed_date:{
    type:Number,
    required:true
  },
})

const owedModel = mongoose.model("owed",owedSchema)
module.exports = owedModel;