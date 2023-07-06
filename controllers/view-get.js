// GET - ROL USER
exports.home = (async(req, res) => {
    try {
      res.render('home/index', { title: 'Fomulario',variableNoti : global.notificacion, banderanoti:global.banderanoti});
    } catch (error) {
      res.status(404).render("error/error", { status: error });
    }
  });
  exports.homeLogin = ((req, res) => {
    try {
      res.render('home/index', { title: 'Fomulario', loginUser: req.userId });
    } catch (error) {
      res.status(404).render("error/error", { status: error });
    }
  });
  exports.registro = ((req, res) => {
    try {
      res.render('auth/registro', { title: 'Fomulario' });
    } catch (error) {
      res.status(404).render("error/error", { status: error });
    }
  });
  exports.loginGet = ((req, res) => {
    try {
      res.render('auth/login', { title: 'Fomulario' });
    } catch (error) {
      res.status(404).render("error/error", { status: error });
    }
  });
  exports.recetas = ((req, res) => {
    try {
      res.render('Recipes/allRecipes', { loginUser: req.userId, variableNoti : global.notificacion, banderanoti:global.banderanoti });
    } catch (error) {
      res.status(404).render("error/error", { status: error });
    }
  });
  exports.chef = ((req, res) => {
    try {
      res.render('Recipes/chef', { loginUser: req.userId, variableNoti : global.notificacion, banderanoti:global.banderanoti });
    } catch (error) {
      res.status(404).render("error/error", { status: error });
    }
  });



// GET - ROL ADMIN

const User = require("../models/users")

  exports.adminHome = ( async (req, res) => {
    try {
      const users = await User.find({});
      res.render('admin/adminHome', { loginUser: req.userId, users: users, variableNoti : global.notificacion, banderanoti:global.banderanoti });
    } catch (error) {
      res.status(404).render("error/error",  { status: error });
    }
  });