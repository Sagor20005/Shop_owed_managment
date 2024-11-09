const peopleColl = require("../database/models/peopleModel.js")
const owedColl = require("../database/models/owedModel.js")
const updateCastumarOwed = require("../utilities/updateCastumarOwed")


// Add new people && castumar
const newPeople = async (req, resp)=> {
  const people = new peopleColl(req.body);
  try {
    const result = await people.save()
    console.log(result)
    if (result && result._id) {
      resp.status(200).json({
        state: true,
        msg: "saved success!"
      })
    } else {
      resp.status(500).json({
        state: false,
        msg: "can't save people!!"
      })
    }
  }catch(err) {
    console.log(err)
    resp.status(500).json({
      state: false,
      msg: "Server error!"
    })
  }
};


// update a castumar
const Update_people = async (req, resp)=> {
  try {
    const condition = req.body.condition;
    const data = req.body.data;
    const isUpdated = await peopleColl.findOneAndUpdate(condition, data);
    if (isUpdated && isUpdated._id) {
      resp.status(200).json({
        state: true
      })
    } else {
      resp.status(500).json({
        state: false,
        msg: "cant update people collection!"
      })
    }
  }catch(err) {
    console.log(err)
  }
}

// Delete castumar
const DeleteCastumar = async (req, resp)=> {
  try {
    //delete people by id
    const deletedCastumar = await peopleColl.findOneAndDelete(req.body)
    if (deletedCastumar && deletedCastumar._id) {
      // delete this castumar all owed detals
      const deleteOweds = await owedColl.deleteMany({
        castumar_id: req.body._id
      })
      console.log(deleteOweds)
      if (deleteOweds && deleteOweds.deletedCount > 0) {
        resp.status(200).json({
          state: true,
        })
      } else {
        resp.status(200).json({
          state: false,
          msg: "delete but record can't delete!"
        })
      }
    } else {
      resp.status(500).json({
        state: false,
        msg: "can't delete!"
      })
    }
  }catch(err) {
    resp.status(500).json({
      state: false,
      msg: "can't delete,may server error!"
    })
  }
}


// Get all castumar
const getAllCastumar = async (req, resp)=> {
  try {
    const castumar = await peopleColl.find()
    if (castumar && castumar.length > 0) {
      resp.status(404).json({
        state: true,
        data: castumar
      })
    } else {
      resp.status(404).json({
        state: false,
        msg: "Any Castumar not found!"
      })
    }
  }catch(err) {
    console.log(err)
    resp.status(404).json({
      state: false,
      msg: "server error!"
    })
  }
}

// new owed
const newOwed = async (req, resp)=> {
  const owed = new owedColl(req.body)
  try {
    const saveOwed = await owed.save()
    if (saveOwed && saveOwed._id) {
      // update people collection owed
      updateCastumarOwed( {
        castumar_id: req.body.castumar_id,
        amount: req.body.amount
      }, "+", (err, isok)=> {
        if (!err && isok) {
          resp.status(200).json({
            state: true
          })
        } else {
          resp.status(500).json({
            state: false,
            msg: "Owed not added properly"
          })
        }
      })

    } else {
      resp.status(500).json({
        state: false,
        msg: "Can't save!"
      })
    }
  }catch(err) {
    resp.status(500).json({
      state: false,
      msg: "Server error!"
    })
  }
}

// get owed
const getOwed = async (req, resp)=> {
  try {
    const oweds = await owedColl.find({
      castumar_id: req.params.id
    })
    if (oweds && oweds.length > 0) {
      resp.status(200).json({
        state: true,
        data: oweds
      })
    } else {
      resp.status(500).json({
        state: false,
        msg: "not added any record!"
      })
    }

  }catch(err) {
    console.log(err)
    resp.status(500).json({
      state: false,
      msg: "Server error!"
    })
  }
}

// update owed
const Update_owed = async (req, resp)=> {
  const condition = req.body.condition;
  const data = req.body.data;
  const ref = req.body.ref ? req.body.ref: null;
  try {
    const isChanged = await owedColl.findOneAndUpdate(condition, data)
    if (isChanged && isChanged._id) {
      if (ref) {
        // recquire arg : + || -
        updateCastumarOwed(ref, "-", (err, result)=> {
          console.log("result =", result)
          console.log("err =", err)
          if (!err && result) {
            resp.status(200).json({
              state: true
            })
          } else {
            resp.status(200).json({
              state: false,
              msg: "owed updated but people collection not update!"
            })
          }
        })
      } else {
        resp.status(200).json({
          state: true,
          msg: "owed updated but people collection not update may ref not found!"
        })
      }
    } else {
      resp.status(500).json({
        state: false,
        msg: "can't saved paid!"
      })
    }
  }catch(err) {
    resp.status(500).json({
      state: false,
      msg: "Server error!"
    })
  }
}

// delete owed
const Delete_owed = async (req, resp)=> {
  const deleteCondition = {
    _id: req.body._id
  }
  try {
    const deleteData = await owedColl.findOneAndDelete(deleteCondition)
    if (deleteData && deleteData._id) {
      // update people collection owed
      const ref = {
        castumar_id: req.body.castumar_id,
        amount: req.body.amount
      }
      updateCastumarOwed(ref, "-", (err, isok)=> {
        if (!err && isok) {
          resp.status(200).json({
            state: true
          })
        } else {
          resp.status(500).json({
            state: false,
            msg: "delete but can't remove owed amount!"
          })
        }
      })
    } else {
      resp.status(500).json({
        state: false,
        msg: "can't delete!"
      })
    }
  }catch(err) {
    resp.status(500).json({
      state: false,
      msg: "Server error!"
    })
  }
}




module.exports = {
  newPeople,
  getAllCastumar,
  newOwed,
  getOwed,
  Update_owed,
  Delete_owed,
  Update_people,
  DeleteCastumar
};