var express = require('express');
var router = express.Router();
var UController = require("../controllers/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,"uploads/users"));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
  },
});

const upload = multer({ storage: storage });

/* GET*/
router.get('/', UController.home);

router.get('/registro', UController.registro);

router.post('/registro', upload.single("image"), UController.registroUser);

module.exports = router;
