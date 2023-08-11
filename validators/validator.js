// Validador.js
class Validador {
    constructor() {
      this.validaciones = [];
    }
  
    agregarValidacion(validacion) {
      this.validaciones.push(validacion);
    }
  
    async validar(req, res, next) {
      const errores = [];
  
      const ejecutarValidacion = (index) => {
        if (index === this.validaciones.length) {
          // Si se han ejecutado todas las validaciones, pasa al siguiente middleware
          return next();
        }
        this.validaciones[index](req, res, (error) => {
          if (error) {
            console.log(error)
            // Si hay un error de validación, lo agregamos al array de errores
            errores.push(error);
          }
  
          ejecutarValidacion(index + 1);
        });
      };
  
      ejecutarValidacion(0);
      
    }
  }
  
  module.exports = Validador;
  