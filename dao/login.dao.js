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
          return await User.findOne({ username });
        } catch (error) {
          throw new Error('Error al obtener el usuario');
        }
      }
}

module.exports = UsuarioDAO;
