const Receta = require('../models/recetas');
const User = require('../models/users');
const { trace } = require('../routes/admin');
const mongoose = require('mongoose');

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
    async aprobarReceta(id) {
        try {
          const updatedRecetas = await Receta.findByIdAndUpdate(id, { isAprovado: 1 });
          return updatedRecetas;
          
        } catch (error) {
            throw new Error('No se pudo aprobar esta receta');
        }
        
    };
      async editReceta(recetaData) {
        try {
          //const filtro = { _id: new mongoose.Types.ObjectId(id) };
          console.log("ID:"+recetaData.id )
          return await Receta.updateOne(
            { _id: recetaData.id },
            {
              $set: {
                platilloNombre:recetaData.platilloNombre,
                ingredientes:recetaData.ingredientes,
                pasosSeguir:recetaData.pasosSeguir,
                dificultad: recetaData.dificultad,
                tiempo:recetaData.tiempo,
                porciones: recetaData.porciones,
                tips:recetaData.tips,
                categoria:recetaData.categoria,
                isAprovado:recetaData.isAprovado
              },
            }
            );
          //console.log(updatedReceta); 
          //return updatedReceta
        } catch (error) {
          console.log(error)
          throw new Error('Error al editar receta');
        }
      } 

      async getRecetaByID(id) {
        try {
          const receta = await Receta.findById(id)
          return receta;
        } catch (error) {
            throw new Error('No se pudo encontrar esta receta');
        }
      };
      async agregarComentarioReceta(id) {
        try {
          const Receta = await Receta.findById(id);
          return Receta;
          
        } catch (error) {
            throw new Error('No se pudo encontrar esta receta');
        }
      };
}

module.exports = RecetaDAO;