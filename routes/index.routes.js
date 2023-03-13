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

const profileRoutes = require("./profile.routes.js")
router.use("/profile", profileRoutes)

const searchRoutes = require("./search.routes.js")
router.use("/search", searchRoutes)

module.exports = router;
