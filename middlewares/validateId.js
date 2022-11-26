const { User } = require("../models/users");

const validateId = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user !== null) {
      next();
    } else {
      res
        .status(404)
        .json({ msg: "El id ingresado no se encuentra en la base de datos." });
    }
  } catch (error) {
    res.status(400).json({
      msg: "El formato de id ingresado es inválido, revíselo y vuelva a intentarlo",
      error,
    });
  }
};

module.exports = { validateId };