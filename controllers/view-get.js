// GET - ROL USER
exports.home = (async (req, res) => {
  try {
    const recetasData = await Receta.find({isAprovado:1});
    
    const categorias = await Categoria.find({isActive:true});
  
    res.render('home/index', { title: 'Fomulario', recetas: recetasData,categorias:categorias,variableNoti: global.notificacion, banderanoti: global.banderanoti });
  } catch (error) {
    res.status(404).render("error/error", { status: error });
  }
});
exports.homeLogin = (async(req, res) => {
  try {
    const recetasData = await Receta.find({isAprovado:1});
    const categorias = await Categoria.find({isActive:true}).limit(3);
   
    res.render('home/index', { title: 'Fomulario',recetas: recetasData,categorias:categorias, loginUser: req.userId, variableNoti: global.notificacion, banderanoti: global.banderanoti });
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
exports.recetasHome = (async (req, res) => {
  try {
    const recetasData = await Receta.find({isAprovado:1});
    
    const categorias = await Categoria.find({isActive:true});
    res.render('Recipes/allRecipes', { recetas:recetasData,title: req.params.title,categorias:categorias,loginUser: req.userId, variableNoti: global.notificacion, banderanoti: global.banderanoti });
  } catch (error) {
    res.status(404).render("error/error", { status: error });
  }
});
// exports.recetasindex = ((req, res) => {
//   try {
//     res.render('Recipes/recetas', {  platilloNombre: req.platilloNombre, imagen: global.imagen, dificultad: global.dificultad, tiempo: global.tiempo, dificultad: global.dificultad});
//   } catch (error) {
//     res.status(404).render("error/error", { status: error });
//   }
// });

exports.recetaindex = async (req, res) => {
  try {
    // Obtenemos los campos específicos que queremos de las recetas de la base de datos
    const recetasData = await Receta.find({});

    // Renderizamos la vista Recipes/recetas.ejs y pasamos los datos de las recetas
    res.render('Recipes/recetas', { recetas: recetasData });
  } catch (error) {
    console.log(error);
    res.status(404).render("error/error", { status: error });
  }
};


exports.chef = ((req, res) => {
  try {
    res.render('Recipes/chef', { loginUser: req.userId, variableNoti: global.notificacion, banderanoti: global.banderanoti });
  } catch (error) {
    res.status(404).render("error/error", { status: error });
  }
});

exports.misrecetas = (async (req, res) => {
  try {
    const misrecetas = await Receta.find({user:req.userId}).populate('user');
    const categorias = await Categoria.find({isActive:true});
    console.log(misrecetas)
    res.render('user/misrecetas', { loginUser: req.userId, misrecetas: misrecetas,categorias:categorias, getFechaFormateada,variableNoti: global.notificacion, banderanoti: global.banderanoti });
  } catch (error) {
    res.status(404).render("error/error", { status: error });
  }
});

exports.updatePass = (async (req, res) => {
  try {
    res.render('auth/actualizarContra', {loginUser: req.userId})
  } catch (error) {
    res.status(404).render("error/error", { status: error });
  }
});


// GET - ROL ADMIN

const User = require("../models/users")
const Receta = require("../models/recetas");
const { async } = require("rxjs");
const Categoria = require("../models/categorias");

exports.adminHome = (async (req, res) => {
  try {
    const users = await User.find({});
    res.render('admin/adminHome', { loginUser: req.userId, users: users, variableNoti: global.notificacion, banderanoti: global.banderanoti });
  } catch (error) {
    res.status(404).render("error/error", { status: error });
  }
});

exports.userRecetas = (async (req, res) => {
  try {
    res.render('user/misrecetas', { loginUser: req.userId, variableNoti: global.notificacion, banderanoti: global.banderanoti });
  } catch (error) {
    res.status(404).render("error/error", { status: error });
  }
});

exports.recetas = (async (req, res) => {
  try {
    const rescetas = await Receta.find({}).populate('user');
    res.render('admin/adminRecetas', { loginUser: req.userId, receta: rescetas, getFechaFormateada,variableNoti: global.notificacion, banderanoti: global.banderanoti })
  } catch (error) {
    console.log(error);
    res.status(404).render("error/error", { status: error })
  }
});

exports.categorias = (async (req, res) => {
  try {
    const categorias = await Categoria.find({});
    res.render('admin/adminCategorias', { loginUser: req.userId, categorias:categorias, getFechaFormateada,variableNoti: global.notificacion, banderanoti: global.banderanoti })
  } catch (error) {
    console.log(error);
    res.status(404).render("error/error", { status: error })
  }
});

// Controlador o sección de script de la vista EJS
function getFechaFormateada(fecha) {
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const fechaObj = new Date(fecha);
  const dia = fechaObj.getDate();
  const mes = meses[fechaObj.getMonth()];
  const año = fechaObj.getFullYear();

  return `${dia} de ${mes} del ${año}`;
}