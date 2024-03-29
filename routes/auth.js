var express = require('express');
var router = express.Router();
const { validationResult } = require('express-validator');
const multer = require("multer");
const path = require("path");

var UController = require("../controllers/view-get");
const authenticateToken = require("../middlewares/authentucateToken")
const redirecSesion = require("../middlewares/redirecSesion")
const UserController = require('../controllers/auth');
const userController = new UserController();

const validacionesLogin = require('../validators/loginValidator');
const validacionesRegister = require('../validators/registerValidator');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
  },
});

const upload = multer({ storage: storage });

/* GET*/
router.get('/', redirecSesion ,UController.home);

router.get('/registro', redirecSesion, UController.registro);

router.post('/registro', upload.single("image"), (req, res, next) => {
  //console.log(JSON.stringify(req.body));
  validacionesRegister.validar(req, res, next);
}, (req, res) => {
const errores = validationResult(req);
if (!errores.isEmpty()) {
  const valores = req.body;
  //return res.status(400).json({ errores: errores.array() ,valores:valores})
  return res.render('auth/registro', { errores: errores.array() ,valores:valores});
}
userController.registroUser(req, res);
});

router.get('/login', redirecSesion,UController.loginGet);

router.post('/login', (req, res, next) => {
    validacionesLogin.validar(req, res, next);
}, (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    const valores = req.body;
    return res.render('auth/login', { errores: errores.array() ,valores:valores});
  }
  userController.login(req, res);
});

router.get('/home', authenticateToken ,UController.homeLogin)

router.get('/logout', userController.cerrar.bind(userController));

router.post('/olvide-contracena', userController.accederUpdatePass.bind(userController));

router.get('/restableser-password', authenticateToken, UController.updatePass);

router.post('/reset-password', authenticateToken, userController.updatePass.bind(userController));


module.exports = router;
