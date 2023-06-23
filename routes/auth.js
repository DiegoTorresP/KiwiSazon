var express = require('express');
var router = express.Router();
var UController = require("../controllers/view-get");
const multer = require("multer");
const path = require("path");
const authenticateToken = require("../middlewares/authentucateToken")

const UserController = require('../controllers/auth');
const userController = new UserController();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
  },
});

// const currenUrl = async (req, res, next) =>{
//   const token = req.cookies.token;
//   console.log(token)
//   if (token == true) {
//     res.redirect('/home');
//   }else{
//     res.redirect('/');
//   }
//     next();
// };

const upload = multer({ storage: storage });

/* GET*/
router.get('/'  ,UController.home);

router.get('/registro', UController.registro);

router.post('/registro', upload.single("image"), userController.registroUser.bind(userController));

router.get('/login',UController.loginGet);

router.post('/login', userController.login.bind(userController));

router.get('/recetas', authenticateToken ,UController.recetas)

router.get('/chef', authenticateToken ,UController.chef)

router.get('/home', authenticateToken ,UController.homeLogin)

router.get('/logout', userController.cerrar.bind(userController));

module.exports = router;
