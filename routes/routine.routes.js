const router = require("express").Router();
const { findByIdAndDelete, findById } = require("../models/Exercise.model.js");
const Routine = require("../models/Routine.model.js");
const User = require("../models/User.model.js")

//* routas de routina
//GET "/" => renderizar a todas las routinas
router.get("/", async(req, res, next) => {

  try {
    const response = await Routine.find({owner: "640b3d2ebe6a9f74ff7b3269"})
    res.json(response);
  } catch (error) {
    next(error)
  }


});

//POST "/" => crear las routinas
router.post("/", async (req, res, next) => {
  const { name, owner, frequency, status } = req.body;


  try {
    const response = await Routine.create({
      name,
      owner,
      frequency,
      status,
      exercise: [],
    });

    res.json(response);
  } catch (error) {
    next(error);
  }
});

//GET "/:id" => renderizar a detailles de la routina
router.get("/:id", async(req, res, next) => {
  //populate para sacar la informacion del exercissio al momento de renderizar + repeticion + series + chronometro
    const {id} =   req.params

try {
    
const responseAll = await Routine.findById(id)
.populate("exercises.exercisesId owner")

res.json(responseAll)

} catch (error) {
    next(error)
}


});



//PATCH "/:idRoutine/:idExerciseInArray/edit" => edit propridad of series repeticion y chronometro
router.patch("/:idRoutine/:idExerciseInArray/edit", async(req, res, next)=>{
const {idRoutine, idExerciseInArray} = req.params
const {newRepeticion, newSeries, newChronometro} = req.body

try {
  await Routine.findOneAndUpdate(
    { _id: idRoutine, "exercises._id": idExerciseInArray },
    {
      $set: {
        "exercises.$.series": newSeries,
        "exercises.$.repeticion": newRepeticion,
        "exercises.$.chronometro": newChronometro,
      },
    },
    { new: true }
  )

  res.json("exercise update")
} catch (error) {
  next(error)
}

})



//PATCH "/:id" => agregar exercisio a las routinas por su id
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { exercisesId, series, repeticion, chronometro } = req.body;

  const newobj = {
    exercisesId,
    series,
    repeticion,
    chronometro,
  };

  try {
    await Routine.findByIdAndUpdate(id, {
      $push: { exercises: newobj },
    });

    res.json("a funcionado");
  } catch (error) {
    next(error);
  }
});


//GET "/:idRoutine/:idExerciseInArray" => render all information of an exercise form the routine
router.get("/:idRoutine/:idExerciseInArray", async(req, res, next)=>{
const {idRoutine, idExerciseInArray} = req.params
console.log(idRoutine, idExerciseInArray)

try {

const response = await Routine.findOne({ _id: idRoutine, "exercises._id": idExerciseInArray })  
.select("exercises.$")
.populate("exercises.exercisesId")


  res.json(response)
} catch (error) {
  next(error)
}
})



//PATCH "/:id/:idExercisse" => delete exercise from the array of exercisse
router.patch("/:id/:idExerciseInArray", async(req, res, next)=>{

const {id, idExerciseInArray} = req.params

try {
  await Routine.findByIdAndUpdate(id, {
    $pull: { exercises: { _id: idExerciseInArray } },
  })
  res.json("exercise deleted")
} catch (error) {
  next(error)
}

})





//DELETE "/:id" => delete las routinas por su id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {

    await Routine.findByIdAndDelete(id)

    res.json("the routine has been deleted")
  } catch (error) {
    next(error)
  }
});

module.exports = router;
