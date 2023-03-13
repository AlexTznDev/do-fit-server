const router = require("express").Router();
const Routine = require("../models/Routine.model");

//GET => "/:id" => renderizar Routinas de un usuario en especifico
router.get("/:idUserRoutine", async(req, res, next) => {

    const {idUserRoutine} = req.params
    console.log(req.params)
    try {
      const response = await Routine.find({owner: idUserRoutine})
      res.json(response);
    } catch (error) {
      next(error)
    }
  
    
  
  });

module.exports = router;