const {response} = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const {generarjwt} = require("../helpers/jwt")

//Controlador del post de creación de usuario
const crearUsuario = async(req, res = response)=>{    

    const {name,email,password}= req.body;

    try {
    //verificar si no existe otro usuario
        const usuario = await Usuario.findOne({email})

        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:"El correo ya está siendo usado por otro usuario"
            })
        }
    //Crear usuario
        const dbUser = new Usuario(req.body);
    //hash de la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt)
    //Generar el json web token
        const token = await generarjwt(dbUser.id, name, email);
    //crear usuario de DB
       await dbUser.save();
    //Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            email,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        });
    }
}

//Controlador del post del login de usuario
const loginUsuario =  async(req, res =response)=>{

    const { email,password,}= req.body;

    try {
        const dbUser = await Usuario.findOne({email});
        //verificar que el correo sí esté asociado a una cuenta
        if(!dbUser){
            return res.status(400).json({
                ok:false,
                msg: "el correo no existe"
            })
        }
         //verifica que el password hace match
         const validPassword = bcrypt.compareSync(password, dbUser.password);
         if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: "la contraseña es incorrecta"
            })
        }
        //Generar el JWT
        const token=await generarjwt(dbUser.id, dbUser.name, dbUser.email);
        //respuesta del servicio
        return res.json({
            ok:true,
            uid: dbUser.id,
            name:dbUser.name,
            email:dbUser.email,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:"Fallo crítico, hable con el administrador"
        })
    }
}
//Controlador del get de la renovación de token 
const renewUsuario = async(req, res=response)=>{

    const {uid, name, email} = req;

    const dbUser = await Usuario.findById(uid);

    const token = await generarjwt(uid, dbUser.name);

    return res.json({
        ok:true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token
    })
}


module.exports={
    crearUsuario,
    loginUsuario,
    renewUsuario
}