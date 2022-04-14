const res = require("express/lib/response");

const jwt = require("jsonwebtoken");

const generarjwt = (uid,name) =>{

    const payLoad ={uid, name};

    return new Promise((resolve, reject)=>{

        jwt.sign(payLoad, process.env.SECRET_JWT_SEED,{
            expiresIn: "1h"
        }, (err, token) => {
            if(err){
                console.log(err)
                reject(err);
            }else{
                resolve(token);
            }
        });

    });
    
}

module.exports={
    generarjwt
};