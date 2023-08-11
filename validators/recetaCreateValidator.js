// validacionesLogin.js
const { body } = require('express-validator');
const Validador = require('./validator');
const Categoria = require('../models/categorias');
const RecetaDao = require('../dao/recetas.dao');

const validador = new Validador();

validador.agregarValidacion((req, res, next) => {
  body('platilloNombre').notEmpty().escape().trim().isLength({ min: 5 ,max:80}).withMessage('Ingrese un nombre de platillo correcto').custom(async (value) => {
        // Realiza la verificación de duplicados
        const Receta = new RecetaDao();
        const receta = await Receta.getRecetaByNombre(value.toUpperCase());
        if(receta){
          throw new Error('El nombre del platillo ya existe.')
        }
      })(req, res, next);
});

validador.agregarValidacion((req, res, next) => {
    body('categoria').notEmpty().escape().trim().isLength({ min: 3  }).withMessage('Ingresa un tiempo correcto').custom(async (value) => {
        // Realiza la verificación de duplicados
        const cate = await Categoria.find({nombre:value.toUpperCase()});
        if(!cate){
          throw new Error('La categoria no existe.')
        }
      })(req, res, next);
});

validador.agregarValidacion((req, res, next) => {
    body('dificultad').notEmpty().escape().trim().isLength({ min: 3 }).withMessage('Ingresa una dificultad correcta').custom(async (value) => {
        if(value.toUpperCase() == 'ALTA' || value.toUpperCase() =='BAJA' || value.toUpperCase() =='MEDIA'){
          
        }else{
          throw new Error('La dificultad no existe.')
        }
      })(req, res, next);
});

validador.agregarValidacion((req, res, next) => {
  body('ingredientes').notEmpty().escape().trim().isLength({ min: 20 }).withMessage('Los ingredientes deben tener al menos 20 caracteres')(req, res, next);
});

validador.agregarValidacion((req, res, next) => {
    body('pasosSeguir').notEmpty().escape().trim().isLength({ min: 20 }).withMessage('Los Pasos a Seguir deben tener al menos 20 caracteres')(req, res, next);
  });

validador.agregarValidacion((req, res, next) => {
    body('tiempo').notEmpty().escape().trim().isLength({ min: 1  }).withMessage('Ingresa un tiempo correcto')(req, res, next);
});

validador.agregarValidacion((req, res, next) => {
  body('porciones').notEmpty().isInt().withMessage('Ingresa un tiempo correcto')(req, res, next);
});

validador.agregarValidacion((req, res, next) => {
    body('tips').notEmpty().escape().trim().isLength({ min: 20 }).withMessage('Los tips deben tener al menos 20 caracteres')(req, res, next);
});


module.exports = validador;