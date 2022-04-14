const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario, loginUsuario, renewUsuario } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarjwt } = require("../middlewares/validar-jwt");

const router = Router();


//Crear un nuevo usuario
router.post("/new", [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").isLength({ min: 6 }),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validarCampos],
     crearUsuario);

//login de usuario
router.post("/", [
    check("email", "El email es obligatorio").isEmail(), 
    check("password", "La contraseña es obligatoria").isLength({ min: 6 }), 
    validarCampos] 
    , loginUsuario);

//validar y revalidar token
router.get("/renew",[validarjwt], renewUsuario);










module.exports = router;