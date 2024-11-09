const Express = require("express")
const router = Express.Router()

const {addSell,getAllSell} = require("../controlar/sellControlar.js")


router.post("/",addSell)
router.get("/",getAllSell)


module.exports = router;