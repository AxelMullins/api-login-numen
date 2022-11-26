const jwt = require("jsonwebtoken"); // npm i jsonwebtoken
require("dotenv").config();

module.exports = generateJWT = (body) => {
  return new Promise((resolve, reject) => {
    const payload = { body };

     jwt.sign( payload, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES_SECRET,
      },
      // CB para gestionar errores
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
