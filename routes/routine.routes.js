const router = require("express").Router();
const Routine = require("../models/Routine.model.js");
const User = require("../models/User.model.js")

const isAuthenticated = require("../middlewares/auth.middlewares.js")

//* routas de routina
//GET "/" => renderizar a todas las routinas
router.get("/", isAuthenticated, async(req, res, next) => {

  const {_id} = req.payload

  try {
    const response = await Routine.find({owner: _id})
    res.json(response);
  } catch (error) {
    next(error)
  }


});

//POST "/" => crear las routinas
router.post("/", isAuthenticated, async (req, res, next) => {


  const { name, frequency, status, category } = req.body;
  const {_id}= req.payload

  try {
    const response = await Routine.create({
      name,
      owner: _id,
      frequency,
      status,
      category,
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




//POST "/clone" => CLONE a routine from other id
router.post("/clone",isAuthenticated, async (req, res, next)=>{

  const {_id} = req.payload
  const {name, exercise , frequency, status, category,ownerCloned } = req.body

try {
  await Routine.create({
    name,
    frequency,
    status,
    category,
    owner: _id,
    ownerCloned:ownerCloned,
    exercises:exercise
  })
  res.json("the routine has been clone")
} catch (error) {
  next(error)
}



})



module.exports = router;
