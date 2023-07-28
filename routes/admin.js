var express = require('express');
var router = express.Router();
const authenticateToken = require("../middlewares/authentucateToken")
const isAdmin = require("../middlewares/isAdmin")
var view = require("../controllers/view-get");

const UserController = require('../controllers/admin');
const userController = new UserController();



/* GET users listing. */
router.get('/adminHome', authenticateToken , isAdmin, view.adminHome);

router.post('/admin/:userId/deactivate', isAdmin,userController.deactivateUser);

router.post('/admin/:userId/rol', isAdmin,userController.cambiarRol);

router.get('/adminRecetas', authenticateToken, isAdmin, view.recetas);

router.post('/admin/:id/aprobar', authenticateToken, isAdmin, userController.aprobarReceta);

router.post('/admin/:id/denegar', authenticateToken, isAdmin,userController.rechazarReceta);

module.exports = router;
