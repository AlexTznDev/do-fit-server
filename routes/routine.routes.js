const router = require("express").Router();

//* routas de routina
//GET "/" => renderizar a todas las routinas
router.get("/",(req, res, next)=>{

res.json("todo funciona bien")

})

//POST "/" => crear las routinas
router.post("/",(req, res, next)=>{


})

//GET "/:id" => renderizar a detailles de la routina
router.get("/:id",(req, res, next)=>{
//populate para sacar la informacion del exercissio al momento de renderizar + repeticion + series + chronometro
})

//PATCH "/:id" => edit las routinas por su id
router.patch("/:id",(req, res, next)=>{
})

//DELETE "/:id" => delete las routinas por su id
router.delete("/:id",(req, res, next)=>{
})


module.exports = router;