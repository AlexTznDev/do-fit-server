const router = require("express").Router();
const Routine = require("../models/Routine.model.js");

//* routas de routina
//GET "/" => renderizar a todas las routinas
router.get("/",(req, res, next)=>{

res.json("todo funciona bien")

})

//POST "/" => crear las routinas
router.post("/", async (req, res, next)=>{

    const {name, owner, frequency, status} = req.body


    try {
        
        const response = await Routine.create({
            name,
            owner,
            frequency,
            status,
            exercise:[]
            
        })

        res.json(response)
    

    } catch (error) {
        next (error)
    }

})

//GET "/:id" => renderizar a detailles de la routina
router.get("/:id",(req, res, next)=>{
//populate para sacar la informacion del exercissio al momento de renderizar + repeticion + series + chronometro
})

//PATCH "/:id" => edit las routinas por su id
router.patch("/:id", async (req, res, next)=>{

    const {id} = req.params
    const {exercises, series, repeticion, chronometro} = req.body

    try {

      const response = await Routine.findByIdAndUpdate(id, {

        exercises,
        series,
        repeticion,
        chronometro,

      })  
        
    } catch (error) {
        next(error)
    }

})

//DELETE "/:id" => delete las routinas por su id
router.delete("/:id",(req, res, next)=>{
})


module.exports = router;