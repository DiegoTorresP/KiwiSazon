
// GET
exports.home = ((req, res) => {
    try {
      res.render('home/index', { title: 'Fomulario' });
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
      res.render('Recipes/allRecipes', { loginUser: req.userId });
    } catch (error) {
      res.status(404).render("error/error", { status: error });
    }
  });
  exports.chef = ((req, res) => {
    try {
      res.render('Recipes/chef', { loginUser: req.userId });
    } catch (error) {
      res.status(404).render("error/error", { status: error });
    }
  });