var express = require('express');
var router = express.Router();
const authenticateToken = require("../middlewares/authentucateToken");
const redirecSesion = require("../middlewares/redirecSesion");
var view = require("../controllers/view-get");

const { validationResult } = require('express-validator');
const RecetaController = require('../controllers/receta');
const NotificacionesController = require('../controllers/notificaciones');
const notificacionesController = new NotificacionesController();
const recetaController = new RecetaController();
const multer = require("multer");
const path = require("path");

const validacionCrearReceta = require('../validators/recetaCreateValidator');
const validacionUpdateReceta = require('../validators/recetaUpdateValidator');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/receta/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
  },
});

const upload = multer({ storage: storage });

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/misRecetas', authenticateToken , view.misrecetas);
router.get('/leerNotificaciones', authenticateToken,notificacionesController.marcarLeidas.bind(notificacionesController));
router.get('/recetas/:title',authenticateToken ,view.recetasHome)
router.get('/receta/:title', redirecSesion ,view.recetasHome)

router.get('/recetas/:id/detalle', authenticateToken,recetaController.recetasDetalle);
router.get('/recetas/:id/detalles',recetaController.recetasDetalle);

router.post('/users/crearReceta', authenticateToken, upload.single("image"), (req, res, next) => {
  validacionCrearReceta.validar(req, res, next);
},async (req, res) => {
  const errores = validationResult(req) ; const valores = JSON.stringify(req.body);
  if (!errores.isEmpty()) {
    req.flash("valores",valores);req.flash("error", errores.array()); return res.redirect('/misRecetas');
  }
  recetaController.crearReceta(req, res);
});

router.post('/users/editarReceta',authenticateToken , upload.single("image"),(req, res, next) => {
  validacionUpdateReceta.validar(req, res, next);
},async (req, res) => {
  const errores = validationResult(req) ; const valores = JSON.stringify(req.body);
  if (!errores.isEmpty()) {
    req.flash("error", errores.array()); return res.redirect('/misRecetas');
  }
  recetaController.editarReceta(req,res);
});

//router.post('/users/editarReceta',authenticateToken , upload.single("image"), recetaController.editarReceta.bind(recetaController));

router.post('/users/comentarReceta',authenticateToken,recetaController.comentarReceta.bind(recetaController));
router.post('/users/actualizarComentario',authenticateToken,recetaController.actualizarComentario.bind(recetaController));

router.post('/users/:id/desactivarComentario', authenticateToken, recetaController.deactivateComentario);
router.post('/enviarCalificacion',authenticateToken,recetaController.enviarCalificacion.bind(recetaController));

router.post('/favorite/:id', authenticateToken, recetaController.agregarFavoritos.bind(recetaController));
router.get('/favoritas', authenticateToken, view.recetas_favoritas);

router.post('/eliminar-receta/:idReceta', authenticateToken, recetaController.eliminarFavorito.bind(recetaController));

module.exports = router;
