const router = require("express").Router();
const User = require("../models/User.model.js");

// GET => ruta para hacer un pedido de todos los usuarios disponibles.

router.get("/", async (req, res, next) => {

    try {
     const response = await User.find()
     res.json(response)
     
    } catch (error) {
       console.log(error) 
    }



   // res.json("todo bien")

})


module.exports = router;