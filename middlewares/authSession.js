module.exports = (req, res, next) => {
  if (!req.session.user) {
    res.json({ msg: "Debes iniciar sesión" });
  } else {
    next();
  }
};