const verifyToken = require("./verificaToken");
const User = require("../models/users");


const redirecSesion = async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
      return res.redirect('/home')
    }

    next();
  };

  module.exports = redirecSesion;