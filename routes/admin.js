var express = require('express');
var router = express.Router();
const authenticateToken = require("../middlewares/authentucateToken")
const isAdmin = require("../middlewares/isAdmin")
var view = require("../controllers/view-get");

const UserController = require('../controllers/admin');
const userController = new UserController();

const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/categorias/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
  },
});

const upload = multer({ storage: storage });


/* GET users listing. */
router.get('/adminHome', authenticateToken , isAdmin, view.adminHome);

router.post('/admin/:userId/deactivate', isAdmin,userController.deactivateUser);

router.post('/admin/:userId/rol', isAdmin,userController.cambiarRol);

router.get('/adminRecetas', authenticateToken, isAdmin, view.recetas);

router.post('/admin/:id/aprobar', authenticateToken, isAdmin, userController.aprobarReceta);

router.post('/admin/:id/denegar', authenticateToken, isAdmin,userController.rechazarReceta);

router.get('/adminCategorias', authenticateToken, isAdmin, view.categorias);

router.post('/admin/crearCategoria',authenticateToken, isAdmin, upload.single("image"),userController.crearCategoria.bind(userController))

router.post('/admin/editarCategoria',authenticateToken, isAdmin, upload.single("image"),userController.editarCategoria.bind(userController))

router.post('/admin/categorias/:cateId/deactivate', isAdmin,userController.deactivateCategoria)

module.exports = router;
