const User = require('../models/users');
const Receta = require('../models/recetas');
const Notificacion = require('../models/notificaciones');
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

    async notificarReceta(idReceta,mensaje){
        try {
            console.log(idReceta)
            const receta = await this.consultaRecetas(idReceta)
            console.log(receta)
            let userId = receta.user;
            console.log(userId)
            const notificacion = new Notificacion ({
                user:userId,
                message:mensaje,
                isRead : 0
              });
            console.log(notificacion)
            const newnoti = await notificacion.save();
            const user =await User.findById(userId);
            user.notificaciones.push(newnoti);
            user.save();
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
    
    async consultaNotificaciones(id){
        try {
            const notificaciones = Notificacion.findById(id);
            return notificaciones
        } catch (error) {
            throw new Error("Sin notificaciones que encontrar")
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

    async rechazarReceta(id,comentario) {
        try {
            console.log("comentario"+comentario)
          const updateRecetas = await Receta.findByIdAndUpdate(id, { isAprovado: 2, comentariosRevision:comentario });
          return updateRecetas;
          
        } catch (error) {
            throw new Error('No se pudo aprobar esta receta');
        }  
    };
}

module.exports = UsuarioDAO;