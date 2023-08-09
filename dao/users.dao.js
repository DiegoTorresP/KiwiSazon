const User = require('../models/users');
const Notificaciones = require('../models/notificaciones')
class UsuarioDAO {
    async consultaNotificaciones(id){
      try {
          const notificaciones = Notificaciones.findById(id);
          return notificaciones
      } catch (error) {
          throw new Error("Sin notificaciones que encontrar")
      }
  };
    async getUserNotificationById(userId) {
        try {
          const usuario = User.findById(userId, 'notificacion');
          console.log(usuario);
          if(usuario.notificacion != null){

            return usuario.notificacion
          }else{
            console.log("No tiene")
          }
          return usuario
        } catch (error) {
          throw new Error('Error al obtener el usuario');
        }
      }
}

module.exports = UsuarioDAO;
