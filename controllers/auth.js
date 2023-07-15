const path = require("path");
const fs = require("fs");
const User = require("../models/users")
const jwt = require('jsonwebtoken');
const UserDao = require('../dao/login.dao');
var admin = require("firebase-admin");


const generateToken = (userId) => {
  const token = jwt.sign({ userId }, 'secreto', { expiresIn: '1h' });
  return token;
};

//Funcion para guardar imagenes a firebase
async function guardarImagenEnFirebase(imagen) {
  var bucket = admin.storage().bucket();
  // Lee el archivo de imagen
  const archivo = fs.readFileSync(imagen.path);

  // Crea una referencia al archivo en Firebase Storage
  const rutaArchivo = `users/${Math.round(Math.random() * 9999) +imagen.originalname}`;
  const archivoRef = bucket.file(rutaArchivo);

  // Sube el archivo a Firebase Storage
  await archivoRef.save(archivo, {
    metadata: {
      contentType: imagen.mimetype
    }
  });

  // Obtiene la URL de descarga del archivo
  const url = await archivoRef.getSignedUrl({
    action: 'read',
    expires: '03-01-2500' // Cambia la fecha de vencimiento según tus necesidades
  });

  // Devuelve la URL de descarga
  return url;
}

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

      try {
              
        //Mandamos a llamar la funcion para guardar la imagen en firebase
        // y le pasamos como parametros la imgen del request body
        const url = await guardarImagenEnFirebase(req.file);
        userObj.image = url[0]
        
      } catch (e) {
        console.log(e)
        userObj.image = null;
      }
      console.log(userObj)
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
      console.log(user)
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