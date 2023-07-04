const User = require('../models/users');

class UsuarioDAO {

 async findById(userId) {
        try {
            const usuario = User.findById(userId);
            return usuario
        } catch (error) {
            throw new Error('Error al obtener el usuario');
        }
    }

    async desactivarUsuario(userId) {
        try {
          const updatedUser = await User.findByIdAndUpdate(userId, { isActive: false });
          return updatedUser;
        } catch (error) {
            throw new Error('No se pudo desactivar el usuario');
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
}

module.exports = UsuarioDAO;