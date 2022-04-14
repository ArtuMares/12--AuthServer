const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config.js");
require("dotenv").config();


console.log(process.env)

//Crear servidor / aplicación de express
const app= express();
//Base de datos
dbConnection()
//Directorio público
app.use(express.static("public"));
//CORS
app.use(cors() );
//Lectura y parse de información del body
app.use(express.json());
//Rutas
app.use('/api/auth', require("./routes/auth.js"));


app.listen(process.env.PORT, ()=>{
    console.log(`servidor corriendo en puerto ${4000}`)
});