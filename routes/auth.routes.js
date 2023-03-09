const router = require("express").Router();
const bcrypt = require("bcryptjs")
const User = require("../models/User.model.js")


//* routas de authentification
// POST "/auth/signup" Registar en la base de datos
router.post("/signup", async (req, res, next) => {

    const { email, password } = req.body

    //1.Validaciones de backend

    // - Validar que los campos no esten vacios
    if(!email || !password) {
        res.status(400).json({errorMessage: "Los campos deben estar llenos"})
        return; // Para detener la funcion, detener la ruta
    }
    //-Validar

    try {

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        console.log(hashPassword)

        await User.create({
            email: email,
            password: hashPassword
        })
        res.json("Usuario creado")
       // res.status(201).json()
    } catch (error) {
        next(error)
    }


});

// POST "/auth/login" Validar las credenciales des usuario
router.post("/login", async (req, res, next) => {

});

// GET "/auth/verify" => verificar si el usuario esta activo

router.get("/verify", (req, res, next) => {

});






module.exports = router;