const User = require('../models/users');
const bcrypt = require('bcrypt');
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
          console.log(error)
          throw new Error('Error al obtener el usuario');
        }
    }
    async getUserByUsername2(username) {
      try {
        const user = await User.findOne({ username });
        return user;
      } catch (error) {
        console.log(error)
        throw new Error('Error al obtener el usuario DAO');
      }
  }
    async getUserByEmail(email) {
      try {
          const usuario = await User.findOne({email});
          if(usuario){
            return usuario.email;
          }
          return null;
      } catch (error) {
          throw new Error('Error al obtener el email DAO');
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
      
      async actualizarContracena(username, password){
        try {
          const updatePass = await User.find
        } catch (error) {
          
        }
      }

    async obtenerEmail(email){
      try {
        const user = await User.findOne({email: email});
        return user;
      } catch (error) {
        console.log(error)
        throw new Error('Error al obtener el email DAO - George');
      }
    }
  }
  
  module.exports = UsuarioDAO;
