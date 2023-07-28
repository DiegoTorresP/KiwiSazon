// validacionesLogin.js
const { body } = require('express-validator');
const Validador = require('./validator');

const validador = new Validador();

validador.agregarValidacion((req, res, next) => {
  body('username').notEmpty().escape().trim().isLength({ min: 3 ,max:20}).withMessage('Ingrese un username correcto')(req, res, next);
});

validador.agregarValidacion((req, res, next) => {
  body('password').notEmpty().escape().trim().isLength({ min: 5 ,max:15}).withMessage('Ingrese una contraseña correcta')(req, res, next);
});


module.exports = validador;
