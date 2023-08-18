const Receta = require('../models/recetas');
const Valoraciones = require('../models/valoraciones');
const mongoose = require('mongoose');

class ValoracionesDAO{
    async createValoracion(valoracionData) {
        try {
          console.log("creando valoracion")
          const valoracion = new Valoraciones(valoracionData);
          console.log("valoraciones:", valoracion)
          return await valoracion.save();
        } catch (error) {
          console.log(error)
          throw new Error('Error al valorar');
        }
      }
      async editValoracion(valoracionData) {
        try {
          return await valoracionData.save();
        } catch (error) {
          console.log(error)
          throw new Error('Error al editar valoracion');
        }
      } 
    
}

module.exports = ValoracionesDAO;