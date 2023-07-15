const path = require("path");
const fs = require("fs");
const Receta = require("../models/recetas");
const RecetaDao = require('../dao/recetas.dao');
var admin = require("firebase-admin");
const Usuario = require("../models/users");

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
  }
  async crearReceta(req, res) {
    try {
      const recetaObj = new Receta ({
        user:req.userId,
        platilloNombre:req.body.platilloNombre,
        ingredientes:req.body.ingredientes,
        pasosSeguir:req.body.pasosSeguir,
        dificultad: req.body.dificultad,
        tiempo:req.body.tiempo,
        porciones: req.body.porciones,
        tips: req.body.tips,
        categoria:req.body.categoria
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

}

module.exports = RecetaController;