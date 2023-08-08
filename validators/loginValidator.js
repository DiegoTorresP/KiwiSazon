// validacionesLogin.js
const { body } = require('express-validator');
const Validador = require('./validator');
const UserDao = require('../dao/login.dao');
const bcrypt = require('bcrypt');

const validador = new Validador();
var usuario =null;

validador.agregarValidacion((req, res, next) => {
  body('username').notEmpty().escape().trim().isLength({ min: 3 ,max:20}).withMessage('Ingrese un username correcto').custom(async (value) => {
        // Realiza la verificación de duplicados
        const User = new UserDao();
        const user = await User.getUserByUsername2(value);
        if(user){
          usuario=user;
        }
        if(!user){
          throw new Error('El username o contraseña son incorrectos.')
        }
      })(req, res, next);
});

validador.agregarValidacion((req, res, next) => {
  body('password').notEmpty().escape().trim().isLength({ min: 5 ,max:15}).withMessage('Ingrese una contraseña correcta').custom(async (value) => {
    if(usuario != null){
      const passwordMatch = await bcrypt.compare(value, usuario.password);

      if (!passwordMatch) {
        throw new Error('El username o contraseña son incorrectos.');
      }
    }
    
  })(req, res, next);
});


module.exports = validador;
