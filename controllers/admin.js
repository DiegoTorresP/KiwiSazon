const User = require("../models/users")
const Categoria = require("../models/categorias")
const UserDao = require('../dao/admin.dao');
const { Observable, Subject, async } = require('rxjs');
const userStatusSubject = require('../public/js/notification');
const path = require("path");
const fs = require("fs");
var admin = require("firebase-admin");

//Funcion para guardar imagenes a firebase
async function guardarImagenEnFirebase(imagen) {
    var bucket = admin.storage().bucket();
  // Lee el archivo de imagen
  const archivo = fs.readFileSync(imagen.path);

  // Crea una referencia al archivo en Firebase Storage
  const rutaArchivo = `categorias/${Math.round(Math.random() * 9999) +imagen.originalname}`;
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

class UserController {
    constructor() {
        this.userDao = new UserDao();
    }
/*
    deactivateUser = async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await this.userDao.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            console.log(user.isActive)
            if(user.isActive){
                await this.userDao.desactivarUsuario(userId);
            }else{
                await this.userDao.activarUsuario(userId);
            }
            
            res.redirect('/adminHome')
        } catch (error) {
            console.log(error)
            res.status(404).render("error/error", { status: error });
        }
    };*/

    deactivateUser = async (req, res) => {
        const { userId } = req.params;
      
        try {
          const user = await this.userDao.findById(userId);
      
          if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
          }
      
          if (user.isActive) {
            await this.userDao.desactivarUsuario(userId);
            userStatusSubject.next({ userId, isActive: false }); // Notifica que el usuario se ha desactivado
          } else {
            await this.userDao.activarUsuario(userId);
            userStatusSubject.next({ userId, isActive: true }); // Notifica que el usuario se ha activado
          }
      
          res.redirect('/adminHome');
        } catch (error) {
          console.log(error);
          res.status(404).render('error/error', { status: error });
        }
      };
      
    cambiarRol = async (req, res) => {
        const { userId } = req.params;
        
        try {
        const user = await this.userDao.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

            await this.userDao.convertirAdmin(userId);

            res.redirect('/adminHome')

        } catch (error) {
            console.log(error)
            res.status(404).render("error/error", { status: error });   
        }
    }
    
    aprobarReceta = async(req, res) => {
        const { id } = req.params;
    
        try {
            const receta = await this.userDao.consultaRecetas(id);
            if (!receta) {
                return res.status(404).render("error/error", { status: "receta no encontrada" });
            }
            await this.userDao.aprobarReceta(id);

        res.redirect('/adminRecetas')
        } catch (error) {
            console.log(error)
            res.status(404).render("error/error", { status: error }); 
        }
    };

    rechazarReceta = async(req, res) => {
        console.log(req.body)
        const { id } = req.params;
        const comentario = req.body.comentariosRevision;
        try {
            const receta = await this.userDao.consultaRecetas(id);
            if (!receta) {
                return res.status(404).render("error/error", { status: "receta no encontrada" });
            }
            await this.userDao.rechazarReceta(id,comentario);

            res.redirect('/adminRecetas')
        } catch (error) {
            console.log(error)
            res.status(404).render("error/error", { status: error }); 
        }
    };

    crearCategoria = async (req,res)=>{
        const newCategoria = new Categoria({
            nombre:req.body.nombre.toUpperCase(),
            descripcion: req.body.descripcion
        });

        try{
            try {
              
                //Mandamos a llamar la funcion para guardar la imagen en firebase
                // y le pasamos como parametros la imgen del request body
                const url = await guardarImagenEnFirebase(req.file);
                newCategoria.image = url[0]
                
            } catch (e) {
                console.log(e)
                newCategoria.image = null;
            }
            
            await this.userDao.crearCategoria(newCategoria);
            res.redirect('/adminCategorias')
        }catch(errror){
            res.status(404).render("error/error", { status: error });
        }
    };

    deactivateCategoria = async (req, res) => {
        const { cateId } = req.params;
      
        try {
          const categoria = await this.userDao.catefindById(cateId);
      
          if (!categoria) {
            return res.status(404).json({ error: 'Categoria no encontrado' });
          }
      
          if (categoria.isActive) {
            await this.userDao.desactivarCategoria(cateId);
            //userStatusSubject.next({ userId, isActive: false }); // Notifica que el usuario se ha desactivado
          } else {
            await this.userDao.activarCategoria(cateId);
            //userStatusSubject.next({ userId, isActive: true }); // Notifica que el usuario se ha activado
          }
      
          res.redirect('/adminCategorias');
        } catch (error) {
          console.log(error);
          res.status(404).render('error/error', { status: error });
        }
      };

    editarCategoria = async(req,res)=>{
        try {
            const cateObjEdit = {
              id : req.body.cateId,
              nombre:req.body.nombre.toUpperCase(),
              descripcion: req.body.descripcion
            };
            
            if(req.file != null || req.file != undefined){
                try {
                    
                    //Mandamos a llamar la funcion para guardar la imagen en firebase
                    // y le pasamos como parametros la imgen del request body
                    const url = await guardarImagenEnFirebase(req.file);
                    cateObjEdit.image = url[0]
                    
                  } catch (e) {
                    console.log(e)
                    cateObjEdit.image = null;
                  }
            }else{
                cateObjEdit.image=null;
            }
            
            const editReceta = await this.userDao.editCategoria(cateObjEdit);
            
            //user.recetas.push(newReceta);
            //user.save(); 
            res.redirect('/adminCategorias');
          } catch (error) {
            console.log(error)
            res.status(404).render("error/error", { status: error });
          }
    }
}

module.exports = UserController;