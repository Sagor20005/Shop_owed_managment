const Express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
// internal imports
const defaultAdmin = require("./utilities/defaultAdmin.js")
const owedRouter = require("./router/owedRouter.js")
const sellRouter = require("./router/sellRouter.js")
const authRouter = require("./router/authRouter.js")



// Initial app Object
const App = Express()

// environment varuable
dotenv.config()

// parser
App.use(cors(
  {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}
  ))
App.use(Express.json())

// static folder
App.use(Express.static("./public"))

// mongodb database start
require("./database/connect.js")
// set default admin
defaultAdmin()

// Routers
App.use("/owed",owedRouter)
App.use("/sell",sellRouter)
App.use("/auth",authRouter)

// Error handler

App.listen(process.env.PORT || 5000,()=>{
  console.log(`api running at ${process.env.PORT} ....`)
})