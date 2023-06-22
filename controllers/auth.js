const path = require("path");
const fs = require("fs");
const User = require("../models/users")
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, 'secreto', { expiresIn: '1h' });
  return token;
};


// GET
exports.home = ((req, res) => {
  try {
    res.render('home/index', {loginUser: req.userId});
    console.log(req.userId)
  } catch (error) {
    res.status(404).render("error/error", { status: error});
  }
});
exports.registro = ((req, res) => {
  try {
    res.render('auth/registro', { title: 'Fomulario' });
  } catch (error) {
    res.status(404).render("error/error", { status: error });
  }
});
exports.loginGet = ((req, res) => {
  try {
    res.render('auth/login', { title: 'Fomulario' });
  } catch (error) {
    res.status(404).render("error/error", { status: error });
  }
});
exports.recetas = ((req, res) => {
  try {
    res.render('Recipes/allRecipes', { loginUser: req.userId});
  } catch (error) {
    res.status(404).render("error/error", { status: error });
  }
});

// POST
exports.registroUser = (async (req, res) => {
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
    var UserD = 0;
    var EmailD = 0;
    try{
      UserD = await User.count({ "username": userObj.username });
      EmailD = await User.count({ "email": userObj.email });
    }catch{
      UserD=-1;
      EmailD=-1;
    }
/*
    if(UserD>0 || EmailD>0 || UserD==-1 || EmailD==-1){
      if(UserD>0){
        req.flash("error", "El usuario ya esta en uso");
      }
      if(EmailD>0){
        req.flash("error", "El correo electronico ya esta en uso");
      }
      if(UserD == -1 || EmailD==-1){
        req.flash("error", "Error con la base de datos");
      }
    }else{
      await userObj.save();
      res.redirect('/')
    }*/
    await userObj.save();
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.status(404).render("error/error", { status: error });
  }
});

exports.login = (async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      console.log("1")
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    if (!user.password) {
      console.log("2")
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generateToken(user._id);
    res.cookie('token', token); // Almacenar el token en una cookie
    res.redirect('/'); // Redirigir al panel de control después del inicio de sesión

  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

exports.cerrarSesion = ((req, res) => {
  res.clearCookie('token'); // Borrar la cookie del token
  res.redirect('/'); // Redirigir al inicio de sesión después del cierre de sesión
});