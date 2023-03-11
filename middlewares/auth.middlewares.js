// 4. CREAMOS EL MIDDLEWARE PARA PODER SABER SI EL USUARIO ESTA AUTENTIFICADO.

const {expressjwt} = require("express-jwt")

const isAuthenticated = expressjwt({
    // 4.1 Aqui todas las configuraciones para desencriptar el token
    secret: process.env.TOKEN_SECRET,
    algorithms:["HS256"], // el algoritmo que usamos para cifrar
    requestProperty: "payload", // para permitirnos tener el payload del tojen para saber que usario es el que se esta logeando
    getToken: (req) =>{

        if(req.headers === undefined || req.headers.authorization === undefined) {
            console.log("usuario no tiene token")
            return null
        }

        const tokenArr = req.headers.authorization.split(" ")
        const tokenType = tokenArr[0]
        const token = tokenArr[1]

        if(tokenType!== "Bearer"){
            console.log("token no valido")
            return null
        }

        console.log("token existente y de tipo correcto")
        return token

        //console.log(req.headers.authorization)


    }
})

module.exports = isAuthenticated