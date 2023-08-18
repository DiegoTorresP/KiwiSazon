// validacionesLogin.js
const { body } = require('express-validator');
const Validador = require('./validator');
const UserDao = require('../dao/login.dao');

const validador = new Validador();

validador.agregarValidacion((req, res, next) => {
  body('username').notEmpty().escape().trim().isLength({ min: 3 }).withMessage('El username debe tener al menos 3 caracteres.').custom(async (value) => {
    // Realiza la verificación de duplicados
    const User = new UserDao();
    const user = await User.getUserByUsername2(value);
    if (user) {
      throw new Error('El username ya está en uso.');
    }
    return true;
  })(req, res, next);
});


validador.agregarValidacion((req, res, next) => {
  body('password').notEmpty().escape().trim().withMessage('Ingrese una contraseña correcta').isLength({ min: 5 ,max:15}).withMessage('La contraseña debe contener mas de 6 caracteres')(req, res, next);
});

validador.agregarValidacion((req, res, next) => {
  body('nombre').notEmpty().escape().trim().withMessage('Ingrese un nombre correcto').isLength({ min: 3 ,max:30}).withMessage('El nombre debe contener mas de 3 caracteres')(req, res, next);
});

validador.agregarValidacion((req, res, next) => {
  body('apellido').notEmpty().escape().trim().withMessage('Ingrese un capellido correcto').isLength({ min: 3 ,max:30}).withMessage('El apellido debe contener mas de 3 caracteres')(req, res, next);
});

validador.agregarValidacion((req, res, next) => {
  body('email').notEmpty().escape().trim().isEmail().withMessage('Ingrese un email correcto').custom(async (value) => {
    // Realiza la verificación de duplicados
    const User = new UserDao();
    const user = await User.getUserByEmail(value);
    if (user) {
      throw new Error('El email ya está en uso.');
    }
  })(req, res, next);
});

validador.agregarValidacion((req, res, next) => {
  body('telefono').notEmpty().escape().trim().withMessage('Ingrese untelefono correcto.').isLength({ min: 5 ,max:15}).withMessage('El telefono debe contener 10 caracteres')(req, res, next);
});

module.exports = validador;
