const Receta = require('../models/recetas');
const User = require('../models/users');

class RecetaDAO{
    async createReceta(recetaData) {
        try {
          const receta = new Receta(recetaData);
          return  await receta.save();
        } catch (error) {
          console.log(error)
          throw new Error('Error al crear receta');
        }
      }
      

}

module.exports = RecetaDAO;