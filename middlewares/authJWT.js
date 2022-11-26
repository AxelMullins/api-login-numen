const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/users");

module.exports = authJWT = async (req, res, next) => {
  // const token = req.headers["x-token"]; // Me trae el valor de ese header
  const token = req.headers["x-token"] || req.cookies.sessionDelUsuario.token;
  console.log(token);
  // Validar si existe el token
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    // Verificar si yo creé este token, desencriptar jwt (no como bcryptjs)
    const { body } = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(body);

    // Verificar si el id corresponde a un usuario en mi DB
    const user = await User.findById(body.id)
      // const user = await User.findById("6381acf15f2009622e2425c1");
    if (user === null) {
      return res.status(401).json({
        msg: "Este token no es mío",
      });
    }
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token inválido",
      error,
    });
  }
};
