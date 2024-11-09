const Express = require("express")
const router = Express.Router()

const {Login,ChangeAdmin} = require("../controlar/authControlar.js")

router.post("/login",Login)
router.put("/",ChangeAdmin)


module.exports = router;