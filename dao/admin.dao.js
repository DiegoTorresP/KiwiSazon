const User = require('../models/users');
const Receta = require('../models/recetas');
const { Observable, Subject, async } = require('rxjs');
const userStatusSubject = new Subject();

class UsuarioDAO {

 async findById(userId) {
        try {
            const usuario = User.findById(userId);
            return usuario
        } catch (error) {
            throw new Error('Error al obtener el usuario');
        }
    }
/*
    async desactivarUsuario(userId) {
        try {
          const updatedUser = await User.findByIdAndUpdate(userId, { isActive: false });
          return updatedUser;
          
        } catch (error) {
            throw new Error('No se pudo desactivar el usuario');
        }
        
    }*/
    async desactivarUsuario(userId) {
        try {
          const updatedUser = await User.findByIdAndUpdate(userId, { isActive: false });
          userStatusSubject.next({ userId, isActive: false }); // Notifica que el usuario se ha desactivado
      
          return updatedUser;
        } catch (error) {
          throw new Error('No se pudo desactivar el usuario');
        }
      }
      
    async activarUsuario(userId) {
        try {
          const updatedUser = await User.findByIdAndUpdate(userId, { isActive: true });
          return updatedUser;
          
        } catch (error) {
            throw new Error('No se pudo activar el usuario');
        }
        
    }

    async convertirAdmin(userId){
        try {
            const updateAdmin = await User.findByIdAndUpdate(userId, { rol: "admin"});
            return updateAdmin;
        } catch (error) {
            throw new Error('No se pudo actulizar el rol');
        }
    };
    async notificar(userId,mensaje){
        try {
            const updateNotificacion = await User.findByIdAndUpdate(userId, { notificacion: mensaje});
            console.log(updateNotificacion)
            return updateNotificacion;
        } catch (error) {
            throw new Error('No se pudo actualizar la notificación');
        }
    };

    async consultaRecetas(id){
        try {
            const receta = Receta.findById(id);
            return receta
        } catch (error) {
            throw new Error("Sin recetas que encontrar")
        }
    };
    
    async aprobarReceta(id) {
        try {
          const updatedRecetas = await Receta.findByIdAndUpdate(id, { isAprovado: 1 });
          return updatedRecetas;
          
        } catch (error) {
            throw new Error('No se pudo aprobar esta receta');
        }
        
    };

    async rechazarReceta(id) {
        try {
          const updateRecetas = await Receta.findByIdAndUpdate(id, { isAprovado: 2 });
          return updateRecetas;
          
        } catch (error) {
            throw new Error('No se pudo aprobar esta receta');
        }  
    };
}

module.exports = UsuarioDAO;