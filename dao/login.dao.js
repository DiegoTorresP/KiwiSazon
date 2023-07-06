const User = require('../models/users');

class UsuarioDAO {
    async createUser(userData) {
        try {
          const user = new User(userData);
          return await user.save();
        } catch (error) {
          throw new Error('Error al crear el usuario');
        }
      }

    async getUserByUsername(username) {
        try {
          const user = await User.findOne({ username });
          global.username = user.username;
          global.notificacion = user.notificacion;
          global.banderanoti = false;
          return user
        } catch (error) {
          throw new Error('Error al obtener el usuario');
        }
      }

      async getUserNotiByUsername(username) {
        try {
          const user = await User.findOne({ username });
          return user.notificacion
        } catch (error) {
          throw new Error('Error al obtener la notificacion');
        }
      }
}

module.exports = UsuarioDAO;
