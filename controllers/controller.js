const { User } = require("../models/users");
const { Log } = require("../models/logs");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const generateJWT = require("../helpers/generateJWT");

const controllers = {
  newUser: async (req, res) => {
    try {
      const error = validationResult(req);
      if (error.isEmpty()) {
        // Validar email único
        const isEmailExist = await User.findOne({ email: req.body.email });
        if (isEmailExist) {
          return res.status(400).json({ error: "El email ya está registrado" });
        }

        // Encriptar contraseña
        let salt = bcrypt.genSaltSync(10);
        const saveUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, salt),
        });
        await saveUser.save();
        res.status(201).json(saveUser);
      } else {
        res.status(501).json(error);
      }
    } catch (err) {
      res.status(501).json({
        msg: "No se ha logrado registrar, intente mas tarde",
        err,
      });
    }
  },
  allUsers: async (req, res) => {
    const users = await User.find();
    res.status(200).json({ users });
  },
  user: async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user });
  },
  editPassword: async (req, res) => {
    try {
      const error = validationResult(req);
      if (error.isEmpty()) {
        const { id } = req.params;

        let salt = bcrypt.genSaltSync(10);
        let newPassword = bcrypt.hashSync(req.body.password, salt);

        await User.findByIdAndUpdate(id, { password: newPassword });

        res.status(202).json({ msg: "Contraseña actualizada" });
      } else {
        res.status(501).json(error);
      }
    } catch (error) {
      res
        .status(501)
        .json({ msg: "Error al intentar actualizar la contraseña", error });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(202).json({ msg: "Se ha borrado", user });
    } catch (error) {
      res
        .status(400)
        .json({ msg: "Problemas a la hora de borrar la información" });
    }
  },
  login: async (req, res) => {
    const error = validationResult(req); // validar si esta enviando datos
    if (error.isEmpty()) {
      const usuario = await User.findOne({ email: req.body.email });

      // Validaciones
      usuario == null &&
        res
          .status(401)
          .json({ msg: "El email o la contraseña son incorrectos" });
      !bcrypt.compareSync(req.body.password, usuario.password) &&
        res
          .status(401)
          .json({ msg: "El email o la contraseña son incorrectos" });

      // Generar Token
      const token = await generateJWT({
        id: usuario._id,
        name: usuario.name,
        // ROLE: "ADMIN"
      });

      const userSession = {
        _id: usuario._id,
        name: usuario.name,
        email: usuario.email,
        token: token,
      };

      // // Guardar cookie por 30 días. Se puede manejar con un checkbox
      res.cookie("sessionDelUsuario", userSession, {
        maxAge: 60000 * 60 * 24 * 30,
      });
      // Guardar en session
      req.session.user = userSession;

      // Guardar historial de login
      const saveLogs = new Log({
        type: "login",
        userId: usuario._id,
        email: usuario.email,
      });
      await saveLogs.save();

      // res.status(201).json({ log: true, msg: "Usuario logueado", token });

      res.status(201).json({ userSession, log: true, msg: "Usuario logueado" });

    } else {
      res.status(501).json(error);
    }
  },
  logout: async (req, res) => {
    // Guardar historial de login
    const usuario = req.cookies.sessionDelUsuario;
    const saveLogs = new Log({
      type: "logout",
      userId: usuario._id,
      email: usuario.email,
    });
    await saveLogs.save();

    res.clearCookie("sessionDelUsuario");
    req.session.destroy();
    res.status(200).json({ log: false, msg: "Sesión cerrada" });
  },
  consultarCookie: async (req, res) => {
    try {
      res.status(200).json(req.cookies.sessionDelUsuario);
    } catch (error) {
      res.status(204).json({ msg: "No hay cookies guardadas", error });
    }
  },
  allLogs: async (req, res) => {
    const logs = await Log.find();
    res.status(200).json({ logs });
  },
  userLogs: async (req, res) => {
    const userLogs = await Log.find({ userId: req.params.id });
    res.status(200).json({ userLogs });
  },
};

module.exports = controllers;
