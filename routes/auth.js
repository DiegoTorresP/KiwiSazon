var express = require('express');
var router = express.Router();
var UController = require("../controllers/aut");
const fs = require("fs");
const multer = require("multer");
const User = require("../models/users");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,"/uploads/users"));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
  },
});

const upload = multer({ storage: storage });

/* GET*/
router.get('/', function(req, res, next) {
  try {
    res.render('home/index', { title: 'Express' });
  } catch (error) {
    res.status(404).render("error/error", { status: error });
  }
});

router.get('/registro', function(req, res, next) {
  try {
    res.render('auth/registro', { title: 'Fomulario' }); 
  } catch (error) {
    res.status(404).render("error/error", { status:error});
  }
});

router.post('/registro', upload.single("image"),async (req, res) => {
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
        file = path.join(__dirname,"/uploads/users/" + req.file.filename);
        console.log(file)
        userObj.image = {
          data:  fs.readFileSync(file),
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
});

module.exports = router;
