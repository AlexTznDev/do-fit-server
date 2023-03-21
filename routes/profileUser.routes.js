const router = require("express").Router();
const Routine = require("../models/Routine.model");
const isAuthenticated = require("../middlewares/auth.middlewares.js");
const User = require("../models/User.model");

//GET => "/:id" => renderizar Routinas de un usuario en especifico
router.get("/:idUserRoutine", isAuthenticated, async(req, res, next) => {

    const {idUserRoutine} = req.params
    try {
      const rutinasFoundUser = await Routine.find({owner: idUserRoutine})
      const infoFoundUser = await User.findById(idUserRoutine).populate("friends", "name")
      const response = {
        rutinasFoundUser, infoFoundUser
      }
      res.json(response)
      
    } catch (error) {
      next(error)
    }
  });

  router.patch("/:idUser/followUser", isAuthenticated,  async(req, res, next) => {
      const {idUser} = req.params
      const {_id} = req.payload
      res.json(idUser)
      
      
      try {
        await User.findByIdAndUpdate(_id, {
          $push: {friends:idUser}
        })

      } catch (error) {
        console.log(error)  
      }
  })

module.exports = router;