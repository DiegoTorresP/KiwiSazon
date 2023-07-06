const path = require("path");
const fs = require("fs");
const User = require("../models/users")
const jwt = require('jsonwebtoken');
const UserDao = require('../dao/login.dao');

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, 'secreto', { expiresIn: '1h' });
  return token;
};

class UserController {
  constructor() {
    this.userDao = new UserDao();
  }
  async registroUser(req, res) {
    try {

      const userObj = new User({
        username: req.body.username,
        password: req.body.password,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono
      })

      let file;
      try {
        file = path.join("uploads/users/" + req.file.filename);
        console.log(file)
        userObj.image = {
          data: fs.readFileSync(file),
          contentType: "image/png",
        };

      } catch (e) {
        console.log(e)
        userObj.image = null;
      }

      const newUser = await this.userDao.createUser(userObj);

      res.redirect('/login')
    } catch (error) {
      console.log(error)
      res.status(404).render("error/error", { status: error });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Obtener el usuario por nombre de usuario
      const user = await this.userDao.getUserByUsername(username);
      if (!user) {
        console.log("Error el usuario no existe")
        return res.redirect("/login")
      }

      // Verificar la contraseña
      if (user.password !== password) {
        console.log("Error contraceña incorrecta")
        return res.redirect("/login")
      }

      if (user.isActive == false) {
        console.log("Error cuenta desactivada")
        return res.redirect("/login")
      }

      const token = generateToken(user._id);
      res.cookie('token', token); // Almacenar el token en una cookie

      if (user.rol == "user") {
        res.redirect('/home'); // Redirigir al panel de control después del inicio de sesión
      } else {
        res.redirect('/adminHome'); // Redirigir al panel de Admistrador
      }

    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  };

  async cerrar(req, res) {
    res.clearCookie('token'); // Borrar la cookie del token
    res.redirect('/'); // Redirigir al inicio de sesión después del cierre de sesión
  };

}

module.exports = UserController;