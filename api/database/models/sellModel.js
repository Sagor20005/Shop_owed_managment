const mongoose = require("mongoose")

const sellSchema = mongoose.Schema({
  product:{
    type:String,
    default:"anonymous"
  },
  amount:{
    type:String,
    required:true
  },
  sell_date:{
    type:Number,
    default: Date.now()
  }
},{timestamps: true})

const sellModel = mongoose.model("sell",sellSchema)

module.exports = sellModel;