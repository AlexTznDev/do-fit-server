const router = require("express").Router();
const { findByIdAndDelete } = require("../models/Exercise.model");
const Exercise = require("../models/Exercise.model");

//GET "/exercise" => renderizar los exercissios
router.get("/", (req, res, next) => {
  res.json("todo funciona en exercisse routes");
});

//POST "/exercise" => crear exercissio
router.post("/", async (req, res, next) => {
  console.log(req.body);
  const { name, creador, category, calories, description, videoUrl } = req.body;

  try {
    await Exercise.create({
      name,
      creador,
      category,
      calories,
      description,
      videoUrl,
    });
  } catch (error) {
    next(error);
  }

  res.json("the exercise was create");
});

//GET "/:id" => renderizar a detailles de el exercissio
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await Exercise.findById(id);
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//PATCH "/:id" => edit el exercissio por su id
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, category, calories, description, videoUrl } = req.body;

  try {
    await Exercise.findByIdAndUpdate(id, {
      name,
      category,
      calories,
      description,
      videoUrl,
    });
    res.json("the edit it's OK")
  } catch (error) {
    next(error);
  }
});

//DELETE "/:id" => delete el exercissio por su id
router.delete("/:id",async (req, res, next) => {
const {id} = req.params
try {
    await Exercise.findByIdAndDelete(id)
    res.json("the exercise was delete")
} catch (error) {
    next(error)
}


});

module.exports = router;
