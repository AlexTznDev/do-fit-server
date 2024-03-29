const router = require("express").Router();
const { findByIdAndDelete } = require("../models/Exercise.model");
const Exercise = require("../models/Exercise.model");

const isAuthenticated = require("../middlewares/auth.middlewares.js");

//GET "/exercise" => renderizar los exercissios
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const response = await Exercise.find().select({
      category: 1,
      image: 1,
      tagline: 1,
      calories: 1,
      name: 1,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//POST "/exercise" => crear exercissio
router.post("/", isAuthenticated, async (req, res, next) => {
  const { name, category, calories, description, videoUrl, tagline, image } =
    req.body;
  const { _id } = req.payload;
  try {
    await Exercise.create({
      name,
      creador: _id,
      category,
      calories,
      description,
      videoUrl,
      tagline,
      image,
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

    res.json(response);
  } catch (error) {
    next(error);
  }
});

//PATCH "/:id" => edit el exercissio por su id
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, category, calories, description, videoUrl, tagline, image } =
    req.body;

  try {
    await Exercise.findByIdAndUpdate(id, {
      name,
      category,
      calories,
      description,
      videoUrl,
      tagline,
      image,
    });
    res.json("the edit it's OK");
  } catch (error) {
    next(error);
  }
});

//DELETE "/:id" => delete el exercissio por su id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Exercise.findByIdAndDelete(id);
    res.json("the exercise was delete");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
