const router = require("express").Router();
const bcrypt = require("bcryptjs")
const User = require("../models/User.model.js")
const jwt = require("jsonwebtoken")


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


    const {email, password} = req.body
    console.log(req.body)

    try {

        //Verificar que el usuario exista en la BD
    const foundUser = await User.findOne({email:email})
    
    if(!foundUser){
        res.status(400).json({errorMessage: "Credenciales no validas"})
        return;
    }
        //- validar si la contraseña es la correcta
        
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password )
    if(!isPasswordCorrect){
        res.status(400).json({errorMessage: "Credenciales no validas"})
    }

    res.json("Has iniciado sesion")
    //payload => Contenido del token que identifica al usuario

    
    // const payload = {
    //     _id: foundUser._id,
    //     email: foundUser.email
    //     //si tuviesemos roles, podrian ir
    // }
    // // generamos el token
    // const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
    //     algorithm:"HS256",
    //     expiresIn:"2d" // 2 dias
    // })

    // res.status(200).json({authToken:authToken})

        
    } catch (error) {
        next(error)
    }


});

// GET "/auth/verify" => verificar si el usuario esta activo

router.get("/verify", (req, res, next) => {

});






module.exports = router;