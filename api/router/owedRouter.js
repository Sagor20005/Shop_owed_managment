const Express = require("express")
const router = Express.Router()

const {newPeople,getAllCastumar,newOwed,getOwed,Update_owed,Delete_owed,Update_people,DeleteCastumar} = require("../controlar/owedControlar.js")

// path => domain/owed/
router.post("/people",newPeople)
router.get("/people",getAllCastumar)
router.put("/people",Update_people)
router.delete("/people",DeleteCastumar)
router.post("/",newOwed)
router.get("/:id",getOwed)
router.put("/",Update_owed)
router.delete("/",Delete_owed)


module.exports = router;