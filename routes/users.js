var express = require('express');
var router = express.Router();
const authenticateToken = require("../middlewares/authentucateToken");
var view = require("../controllers/view-get");
const RecetaController = require('../controllers/receta');
const recetaController = new RecetaController();
const multer = require("multer");
const path = require("path");


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
router.get('/misRecetas', authenticateToken , view.userRecetas);

router.post('/users/crearReceta',authenticateToken , upload.single("image"), recetaController.crearReceta.bind(recetaController));

module.exports = router;
