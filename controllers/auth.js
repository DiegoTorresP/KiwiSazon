const path = require("path");
const fs = require("fs");
const User = require("../models/users")
const jwt = require('jsonwebtoken');
const UserDao = require('../dao/login.dao');
var admin = require("firebase-admin");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const { sendEmail } = require('../config/mailOptions');
const { sendEmailPass } = require('../config/mailResetPassword');
const { use } = require("../config/transporter");

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

          // Generar un salt (valor aleatorio utilizado para aumentar la seguridad)
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);

      // Encriptar la contraseña con el salt
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const userObj = new User({
        username: req.body.username,
        password: hashedPassword,
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
      const newUser = await this.userDao.createUser(userObj);

      if (newUser !== null && newUser !== undefined) {
        console.log("Correo enviado")
        await sendEmail(userObj.email);
      }

      res.redirect('/login')
    } catch (error) {
      console.log(error)
      res.status(404).render("error/error", { status: error });
    }
  }

  async login(req, res) {
    try {
      
      // Obtener el usuario por nombre de usuario
      const { username, password } = req.body;
      // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
      const user = await this.userDao.getUserByUsername2(username);

      if (!user) {
        console.log("Error el usuario no existe")
        return res.redirect("/login")
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        console.log("Error contraceña incorrecta bycript")
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
      res.status(500).render("error/error", { status: 'Error al iniciar sesión' });
    }
  };
  
  async cerrar(req, res) {
    res.clearCookie('token'); // Borrar la cookie del token
    res.redirect('/'); // Redirigir al inicio de sesión después del cierre de sesión
  };
  
  async accederUpdatePass(req, res){
    const email = req.body.email;
    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      const user = await this.userDao.obtenerEmail(email);
      if (!user) {
        console.log("Error usuario no encontrado")
        return res.redirect("/login")
      }

      user.tokenPass = code
      const data = await user.save()

      if (user.tokenPass == code) {
        await sendEmailPass(user.email, user.tokenPass);
        console.log("Correo enviado")
      }
      const token = generateToken(user._id);
      res.cookie('token', token);
      res.redirect('/restableser-password')
    } catch (error) {
      console.log(error);
      res.status(500).render("error/error", { status: 'Error al actualizar la contraseña' });
    }
  }

  async updatePass(req, res){
    const newPassword = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const tokenPass = req.body.tokenPass;
    try {
      const user = req.userId; 
      if (tokenPass != user.tokenPass) {
        return res.status(400).render("error/error", { status: 'Código de restablecimiento incorrecto' });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).render("error/error", { status: 'Las contraseñas no coinciden' });
      }
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.tokenPass = undefined;
      user.password = hashedPassword;
      await user.save();
      
      res.clearCookie('token');
      res.redirect('/login');
    } catch (error) {
      console.log(error);
      res.status(500).render("error/error", { status: 'Error al actualizar la contraseña' });
    }
  }

}

module.exports = UserController;