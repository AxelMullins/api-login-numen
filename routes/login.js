var express = require("express");
var router = express.Router();
const controller = require("../controllers/controller");
const authSession = require("../middlewares/authSession");
const authJWT = require("../middlewares/authJWT");
const { check } = require("express-validator");
const { validateId } = require("../middlewares/validateId");

/* REGISTRAR */
router.post(
  "/newUser",
  [
    check("name").not().isEmpty().withMessage("Debes ingresar un nombre"),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar un email")
      .isEmail()
      .withMessage("Debes ingresar un formato de email válido"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar una contraseña")
      .isLength({ min: 8, max: 15 })
      .withMessage("La contraseña debe contener entre 8 a 15 caracteres."),
  ],
  controller.newUser
);

/* VER TODOS */
router.get(
  "/allUsers",
  //  authSession,
  authJWT,
  controller.allUsers
);

/* VER UNO */
router.get(
  "/user/:id",
  //  authSession,
  authJWT,
  validateId,
  controller.user
);

/* EDITAR */
router.put(
  "/editPassword/:id",
  // authSession,
  authJWT,
  validateId,
  [
    check("password")
      .not()
      .isEmpty()
      .withMessage("El campo esta vacio")
      .isLength({ min: 8, max: 15 })
      .withMessage("La contraseña debe contener entre 8 a 15 letras."),
  ],
  controller.editPassword
);

/* BORRAR */
router.delete(
  "/deleteUser/:id",
  // authSession,
  authJWT,
  validateId,
  controller.deleteUser
);

/* LOGIN */
router.post(
  "/login",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar un email")
      .isEmail()
      .withMessage("Debes ingresar un formato de email válido"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar una contraseña"),
  ],
  controller.login
);

/* LOGOUT */
router.get("/logout", authSession, authJWT, controller.logout);

/* LOGS */
router.get("/logs", authSession, authJWT, controller.allLogs);

/* LOGS */
router.get("/log/:id", authSession, authJWT, controller.userLogs);

module.exports = router;
