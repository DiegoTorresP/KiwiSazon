const Receta = require('../models/recetas');
const Comentario = require('../models/comentarios');
const mongoose = require('mongoose');

class ComentarioDAO{
    async createComentario(comentarioData) {
        try {
          const comentario = new Comentario(comentarioData);
          return await comentario.save();
        } catch (error) {
          console.log(error)
          throw new Error('Error al crear comentario');
        }
      }
      async editComentario(comentarioData) {
        try {
          //const filtro = { _id: new mongoose.Types.ObjectId(id) };
          return await comentarioData.save();
          //console.log(updatedReceta); 
          //return updatedReceta
        } catch (error) {
          console.log(error)
          throw new Error('Error al editar comentario');
        }
      } 
    
}

module.exports = ComentarioDAO;