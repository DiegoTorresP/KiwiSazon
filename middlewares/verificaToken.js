const jwt = require('jsonwebtoken');
const verifyToken = (token, res, req) => {
    try {
      const decoded = jwt.verify(token, 'secreto');
      return decoded.userId;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
          // El token ha expirado
          console.log('El token ha expirado');
          // Eliminar el JWT de la cookie
          res.clearCookie('token');
        } else {
          // Otro tipo de error ocurrió durante la verificación del token
          console.log('Error al verificar el token');
      }
    }
  };

  module.exports = verifyToken;