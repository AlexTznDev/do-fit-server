const router = require("express").Router();
const User = require("../models/User.model.js");

const isAuthenticated = require("../middlewares/auth.middlewares.js")


//GET "/:id" => renderizar a detailles de el exercissio
router.get("/", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload
    //res.json(req.payload)
    
    
  try {
    const response = await User.findById(_id);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

//PATCH "/:id" => edit el exercissio por su id
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, profileImage, age, weight, height } = req.body;

  try {
    await User.findByIdAndUpdate(id, {
      name,
      profileImage,
      age,
      weight,
      height
    });
    res.json("the edit it's OK");
  } catch (error) {
    next(error);
  }
});



module.exports = router;