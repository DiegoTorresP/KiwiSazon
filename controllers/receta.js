const path = require("path");
const fs = require("fs");
const Receta = require("../models/recetas");
const RecetaDao = require('../dao/recetas.dao');
var admin = require("firebase-admin");
const Usuario = require("../models/users");
const Comentario = require("../models/comentarios");
const ComentarioDAO = require("../dao/comentario.dao");
const Notificaciones = require("../models/notificaciones")
//Funcion para guardar imagenes a firebase
async function guardarImagenEnFirebase(imagen) {
    var bucket = admin.storage().bucket();
  // Lee el archivo de imagen
  const archivo = fs.readFileSync(imagen.path);

  // Crea una referencia al archivo en Firebase Storage
  const rutaArchivo = `recetas/${Math.round(Math.random() * 9999) +imagen.originalname}`;
  const archivoRef = bucket.file(rutaArchivo);

  // Sube el archivo a Firebase Storage
  await archivoRef.save(archivo, {
    metadata: {
      contentType: imagen.mimetype
    }
  });

  // Obtiene la URL de descarga del archivo
  const url = await archivoRef.getSignedUrl({
    action: 'read',
    expires: '03-01-2500' // Cambia la fecha de vencimiento según tus necesidades
  });

  // Devuelve la URL de descarga
  return url;
}

class RecetaController {
  
  constructor() {
    this.recetaDao = new RecetaDao();
    this.comentarioDao = new ComentarioDAO();
  }

  async crearReceta(req, res) {
    try {
      const recetaObj = new Receta ({
        user:req.userId,
        platilloNombre:req.body.platilloNombre.toUpperCase(),
        ingredientes:req.body.ingredientes,
        pasosSeguir:req.body.pasosSeguir,
        dificultad: req.body.dificultad,
        tiempo:req.body.tiempo,
        porciones: req.body.porciones,
        tips: req.body.tips,
        categoria:req.body.categoria.toUpperCase()
      });
      
      const user =await Usuario.findById(req.userId);
      try {
              
        //Mandamos a llamar la funcion para guardar la imagen en firebase
        // y le pasamos como parametros la imgen del request body
        const url = await guardarImagenEnFirebase(req.file);
        recetaObj.imagen = url[0]
        
      } catch (e) {
        console.log(e)
        recetaObj.imagen = null;
      }
      console.log(recetaObj);
      const newReceta = await this.recetaDao.createReceta(recetaObj);
      user.recetas.push(newReceta);
      user.save();
      res.redirect('/misRecetas');
    } catch (error) {
      console.log(error)
      res.status(404).render("error/error", { status: error });
    }
  };

  async editarReceta(req, res) {
    try {
      const recetaObjEdit = {
        id : req.body.recetaId,
        user:req.userId,
        platilloNombre:req.body.platilloNombre.toUpperCase(),
        ingredientes:req.body.ingredientes,
        pasosSeguir:req.body.pasosSeguir,
        dificultad: req.body.dificultad,
        tiempo:req.body.tiempo,
        porciones: req.body.porciones,
        tips: req.body.tips,
        categoria:req.body.categoria.toUpperCase(),
        isAprovado:0
      };
      console.log(recetaObjEdit)
      try {
              
        //Mandamos a llamar la funcion para guardar la imagen en firebase
        // y le pasamos como parametros la imgen del request body
        const url = await guardarImagenEnFirebase(req.file);
        recetaObjEdit.imagen = url[0]
        
      } catch (e) {
        console.log(e)
        recetaObjEdit.imagen = null;
      }
      console.log("EDIT RECETA:\n"+recetaObjEdit)
      const editReceta = await this.recetaDao.editReceta(recetaObjEdit);
      console.log("EDIT RECETA 2:\n"+editReceta)
      //user.recetas.push(newReceta);
      //user.save();
      res.redirect('/misRecetas');
    } catch (error) {
      console.log(error)
      res.status(404).render("error/error", { status: error });
    }
  };

  async recetasDetalle (req ,res){
    const { id } = req.params;
    try{
      const receta = await Receta.findById(id).populate({
        path: 'comentarios',
        match: { isActive: true },
        populate: {
            path: 'user',
            model: 'users'
        }
    });
    receta.comentarios.sort((a, b) => b.date - a.date);
    const notificaciones = await Notificaciones.find({user:req.userId, isRead :0}) 
    if(req.userId){
        res.render("Recipes/detalleReceta", {loginUser: req.userId,getFechaFormateada, notificaciones:notificaciones,receta:receta});
      }else{
        res.render("Recipes/detalleReceta", { getFechaFormateada ,receta:receta,notificaciones:notificaciones});
      }
      
    }catch (error){
      console.log(error)
      res.status(404).render("error/error", { status: error });
    }
  };

  async comentarReceta (req ,res){

    try{
      const comentarioData = new Comentario({
        user:req.userId,
        receta: req.body.idReceta,
        comentario:req.body.comentario
      });
      const receta = await Receta.findById(req.body.idReceta).populate({
        path: 'comentarios',
        match: { isActive: true },
        populate: {
            path: 'user',
            model: 'users'
        }
    });
      if (!receta) {
        console.log('Receta no encontrada.');
        const notificaciones = await Notificaciones.find({user:req.userId, isRead :0}) 
        res.render("Recipes/detalleReceta", {loginUser: req.userId,  getFechaFormateada,notificaciones:notificaciones ,receta:receta});
      }
      const comentario = await this.comentarioDao.createComentario(comentarioData);
      const notificaciones = await Notificaciones.find({user:req.userId, isRead :0})
        //receta.comentarios.push(comentario);
        //console.log("Llega")
        //receta.save();
        //console.log("Llega2")
        receta.comentarios.push(comentario);
        receta.comentarios.sort((a, b) => b.date - a.date);

        await Receta.updateOne({ _id: receta._id }, { $push: { comentarios: comentario } });

        //receta.comentarios.sort((a, b) => b.date - a.date); 
      res.render("Recipes/detalleReceta", {loginUser: req.userId,  getFechaFormateada,notificaciones:notificaciones ,receta:receta});
      
    }catch (error){
      console.log(error)
      res.status(404).render("error/error", { status: error });
    }
  };

  async actualizarComentario (req ,res){

    try{
      const comentario = await Comentario.findById(req.body.idComentario);
      if(comentario){
        comentario.comentario = req.body.comentario;
        const newComentario = await this.comentarioDao.editComentario(comentario);
        if (!newComentario) {
          const receta = await Receta.findById(comentario.receta._id).populate({
            path: 'comentarios',
            match: { isActive: true },
            populate: {
                path: 'user',
                model: 'users'
            }
          });
          console.log('Comentario no encontrado.');
          const notificaciones = await Notificaciones.find({user:req.userId, isRead :0})
          res.render("Recipes/detalleReceta", {loginUser: req.userId,  getFechaFormateada,notificaciones:notificaciones ,receta:receta});
        }
        if(newComentario){
          const receta = await Receta.findById(comentario.receta._id).populate({
            path: 'comentarios',
            match: { isActive: true },
            populate: {
                path: 'user',
                model: 'users'
            }
          });
          receta.comentarios.sort((a, b) => b.date - a.date); 
          const notificaciones = await Notificaciones.find({user:req.userId, isRead :0})
          res.render("Recipes/detalleReceta", {loginUser: req.userId,  getFechaFormateada,notificaciones:notificaciones ,receta:receta});
        }
      }
      
      
      
     
      
    }catch (error){
      console.log(error)
      res.status(404).render("error/error", { status: error });
    }
  };

  deactivateComentario = async (req, res) => {
    const { id } = req.params;
  console.log(id)
    try {
      const comentarioData = await Comentario.findById(id);
  
      if (!comentarioData) {
        return res.status(404).json({ error: 'Comentario no encontrado' });
      }
  
      
        const comentario=  await Comentario.findByIdAndUpdate(id, { isActive: false });
        const notificaciones = await Notificaciones.find({user:req.userId, isRead :0})
        const receta = await Receta.findById(comentario.receta._id).populate({
          path: 'comentarios',
          match: { isActive: true },
          populate: {
              path: 'user',
              model: 'users'
          }
        });
        res.render("Recipes/detalleReceta", {loginUser: req.userId,  getFechaFormateada,notificaciones:notificaciones,receta:receta});
      
    } catch (error) {
      console.log(error);
      res.status(404).render('error/error', { status: error });
    }
  };

}




// Controlador o sección de script de la vista EJS
function getFechaFormateada(fecha) {
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const fechaObj = new Date(fecha);
  const dia = fechaObj.getDate();
  const mes = meses[fechaObj.getMonth()];
  const año = fechaObj.getFullYear();

  return `${dia} de ${mes} del ${año}`;
}

module.exports = RecetaController;