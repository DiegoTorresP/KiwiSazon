const path = require("path");
const fs = require("fs");
const Receta = require("../models/recetas");
const RecetaDao = require('../dao/recetas.dao');
var admin = require("firebase-admin");
const Usuario = require("../models/users");
const Comentario = require("../models/comentarios");
const ComentarioDAO = require("../dao/comentario.dao");
const ValoracionesDAO = require("../dao/valoraciones.dao")
const Notificaciones = require("../models/notificaciones");
const Valoraciones = require("../models/valoraciones");
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
    this.valoracionDao = new ValoracionesDAO();
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
      const newReceta = await this.recetaDao.createReceta(recetaObj);
      user.recetas.push(newReceta);
      user.save();
      const mensaje = {
        title:'Receta Creada',
        subtitle:'La receta esta en revisión, un administrador verificará que cumpla con lo necesario y se te notificará'
      }
      req.flash("success", mensaje);
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
    receta.calificacion.sort((a, b)=> b.date - a.date);
    //Calcular calificación general
    let sumaValoraciones = 0;
    for (let i = 0; i < receta.calificacion.length; i++) {
      const valoracion = await Valoraciones.find({_id:receta.calificacion[i]})
      for (let i = 0; i < valoracion.length; i++) {
        sumaValoraciones += valoracion[i].valoracion;
      }
    }
    const promedioValoraciones = ((sumaValoraciones / receta.calificacion.length)*100)/5;
    console.log("General VALORACION:",promedioValoraciones)
    //Consultar calificacion de usuario actual
    let valoracion = 0;
    for (let i = 0; i < receta.calificacion.length; i++) {
      valoracion = await Valoraciones.findOne({_id:receta.calificacion[i],user:req.userId})
      
    }
    //console.log("Personal VALORACION:",valoracion.valoracion)
    let valoracionPer = 0;
    if (valoracion != null){
      valoracionPer = valoracion.valoracion;
    }
    const valoracionPersonal = valoracionPer;
    const notificaciones = await Notificaciones.find({user:req.userId, isRead :0}) 
    console.log("RECETA DETALLES:",receta)
    if(req.userId){
        res.render("Recipes/detalleReceta", {loginUser: req.userId,getFechaFormateada, notificaciones:notificaciones,receta:receta, promedioValoraciones:promedioValoraciones.toFixed(2), valoracionPersonal:valoracionPersonal});
      }else{
        res.render("Recipes/detalleReceta", { getFechaFormateada ,receta:receta,notificaciones:notificaciones,promedioValoraciones:promedioValoraciones.toFixed(2)});
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
  
  async enviarCalificacion (req ,res){

    try{
      const valoracionData = new Valoraciones({
        user:req.userId,
        receta: req.body.idReceta,
        valoracion:req.body.rating
      });
      console.log(valoracionData)
      const receta = await Receta.findById(req.body.idReceta).populate({
        path: 'calificacion',
        match: { isActive: true },
        populate: {
            path: 'user',
            model: 'users'
        }

    });
    console.log(receta)
      if (!receta) {
        console.log('Receta no encontrada.');
        const notificaciones = await Notificaciones.find({user:req.userId, isRead :0}) 
        res.render("Recipes/detalleReceta", {loginUser: req.userId,  getFechaFormateada,notificaciones:notificaciones ,receta:receta});
      }
      const valoracion = await this.valoracionDao.createValoracion(valoracionData);
      console.log("Se guardo la valoracion:",valoracion)
      const notificaciones = await Notificaciones.find({user:req.userId, isRead :0})
      receta.calificacion.push(valoracion);
      receta.calificacion.sort((a, b) => b.date - a.date);

      await Receta.updateOne({ _id: receta._id }, { $push: { calificacion: valoracion } });
      console.log("Receta con valoracion:", receta)
        //receta.comentarios.sort((a, b) => b.date - a.date); 
      res.redirect('back');
      //res.render("Recipes/detalleReceta", {loginUser: req.userId,  getFechaFormateada,notificaciones:notificaciones ,receta:receta});
      
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

  async agregarFavoritos (req, res){
    try {
      const {id} = req.params;
      const receta = await this.recetaDao.getRecetaByID(id)
      const user = await Usuario.findById(req.userId).populate('followReceta');

      const recetaExists = user.followReceta.some(item => item.equals(receta._id));

      if (recetaExists) {
        console.log("La receta ya existe en favoritos");
        
        const mensaje = {
          title:'Esta agregada a favoritos',
          subtitle:'La receta esta agregada a tus favotitas'
        }
        req.flash('error', mensaje);
        console.log(req.flash("error"))
        return res.redirect("/home");
      }


      user.followReceta.push(receta);
      user.save()
      res.redirect('back');
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