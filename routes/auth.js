var express = require('express');
var router = express.Router();
var UController = require("../controllers/auth");
const multer = require("multer");
const path = require("path");
const jwt = require('jsonwebtoken');
const User = require("../models/users")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
  },
});

const upload = multer({ storage: storage });


const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');
  }

  const userId = verifyToken(token, res, req);
  const user = await User.findById(userId);
  if (!userId) {
    return res.redirect('/login');
  }

  req.userId = user;
  next();
};
const verifyToken = (token, res, req) => {
  try {
    const decoded = jwt.verify(token, 'secreto');
    return decoded.userId;
  } catch (error) {
      if (error.name === 'TokenExpiredError') {
        // El token ha expirado
        console.log('El token ha expirado');
        // Eliminar el JWT de la cookie
        res.clearCookie('token');
        req.flash("error", "El token ha expirado");
      } else {
        // Otro tipo de error ocurrió durante la verificación del token
        console.log('Error al verificar el token');
    }
  }
};


/* GET*/
router.get('/', UController.home);

router.get('/registro', UController.registro);

router.post('/registro', upload.single("image"), UController.registroUser);

router.get('/login', UController.loginGet);

router.post('/login', UController.login);

router.get('/recetas', authenticateToken ,UController.recetas)

module.exports = router;
