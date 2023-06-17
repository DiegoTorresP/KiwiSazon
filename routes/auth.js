var express = require('express');
var router = express.Router();
var UController = require("../controllers/aut");

const User = require("../models/users");

/* GET*/
router.get('/', function(req, res, next) {
  res.render('home/index', { title: 'Express' });
});

router.get('/registro', function(req, res, next) {
  res.render('auth/registro', { title: 'Fomulario' });
});

router.post('/registro', async (req, res) => {
  try {
      const { username, password } = req.body;
      const user = new User({ username, password });
      console.log(user)
      await user.save();
     res.redirect('/')
  } catch (error) {
    console.log(error)
    res.status(404).render("error/error", { status: error });
  }
});

module.exports = router;
