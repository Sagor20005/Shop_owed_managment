const mongoose = require("mongoose")

const dbpath = `${process.env.MONGODB}/kalamshop`

mongoose.connect(dbpath).then(()=>{
  console.log("databese connected.")
}).catch((err)=>{
  console.log(err)
})