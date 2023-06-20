const path = require("path");
const fs = require("fs");
const User = require("../models/users")

// GET
exports.home = ((req, res) => {
  try {
    res.render('home/index', { title: 'Express' });
  } catch (error) {
    res.status(404).render("error/error", { status: error });
  }
})
exports.registro = ((req, res) => {
  try {
    res.render('auth/registro', { title: 'Fomulario' });
  } catch (error) {
    res.status(404).render("error/error", { status: error });
  }
})

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
      file = path.join(__dirname, "uploads/users/" + req.file.filename);
      console.log(file)
      userObj.image = {
        data: fs.readFileSync(file),
        contentType: "image/png",
      };

    } catch (e) {
      console.log(e)
      userObj.image = null;
    }
    await userObj.save();
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.status(404).render("error/error", { status: error });
  }
})