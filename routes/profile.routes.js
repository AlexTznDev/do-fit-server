const router = require("express").Router();
const User = require("../models/User.model.js");

const isAuthenticated = require("../middlewares/auth.middlewares.js")


//GET "/" => renderizar lso detalles del perfil
router.get("/", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload
    //res.json(req.payload)
    
    
  try {
    const response = await User.findById(_id).populate("friends", "name")
   
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//PATCH "/:id" => edit del perfil
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, imageProfile, age, weight, height } = req.body;


  try {
    await User.findByIdAndUpdate(id, {
      name,
      imageProfile,
      age,
      weight,
      height
    });
    res.json("the edit it's OK");
  } catch (error) {
    next(error);
  }
});

// GET "/:id" => detalles del perfil de otro usuario

router.get("/:id", async (req, res, next) => {
  const { id } = req.params
    //res.json(req.payload)
    
    
  try {
    const response = await User.findById(id);

    res.json(response);
  } catch (error) {
    next(error);
  }
});


module.exports = router;