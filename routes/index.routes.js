const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const routineRoutes = require("./routine.routes.js")
router.use("/routine", routineRoutes)

const exerciseRoutes = require("./exercise.routes.js")
router.use("/exercise", exerciseRoutes)

const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)

module.exports = router;
