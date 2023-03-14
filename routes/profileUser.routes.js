const router = require("express").Router();
const Routine = require("../models/Routine.model");
const isAuthenticated = require("../middlewares/auth.middlewares.js");
const User = require("../models/User.model");

//GET => "/:id" => renderizar Routinas de un usuario en especifico
router.get("/:idUserRoutine", async(req, res, next) => {

    const {idUserRoutine} = req.params
    try {
      const response1 = await Routine.find({owner: idUserRoutine})
      const response2 = await User.findById(idUserRoutine).populate("friends", "name")
      const response = {
        response1, response2
      }
      res.json(response)
      console.log(response)
    } catch (error) {
      next(error)
    }
  });

  router.patch("/:idUser/followUser", isAuthenticated,  async(req, res, next) => {
      const {idUser} = req.params
      const {_id} = req.payload
      res.json(idUser)
      console.log(_id)
      
      try {
        await User.findByIdAndUpdate(_id, {
          $push: {friends:idUser}
        })

      } catch (error) {
        console.log(error)  
      }
  })

module.exports = router;