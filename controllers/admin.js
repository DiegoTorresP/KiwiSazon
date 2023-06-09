const User = require("../models/users")
const UserDao = require('../dao/admin.dao');
const { Observable, Subject } = require('rxjs');
const userStatusSubject = require('../public/js/notification');

class UserController {
    constructor() {
        this.userDao = new UserDao();
    }
/*
    deactivateUser = async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await this.userDao.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            console.log(user.isActive)
            if(user.isActive){
                await this.userDao.desactivarUsuario(userId);
            }else{
                await this.userDao.activarUsuario(userId);
            }
            
            res.redirect('/adminHome')
        } catch (error) {
            console.log(error)
            res.status(404).render("error/error", { status: error });
        }
    };*/

    deactivateUser = async (req, res) => {
        const { userId } = req.params;
      
        try {
          const user = await this.userDao.findById(userId);
      
          if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
          }
      
          if (user.isActive) {
            await this.userDao.desactivarUsuario(userId);
            userStatusSubject.next({ userId, isActive: false }); // Notifica que el usuario se ha desactivado
          } else {
            await this.userDao.activarUsuario(userId);
            userStatusSubject.next({ userId, isActive: true }); // Notifica que el usuario se ha activado
          }
      
          res.redirect('/adminHome');
        } catch (error) {
          console.log(error);
          res.status(404).render('error/error', { status: error });
        }
      };
      
    cambiarRol = async (req, res) => {
        const { userId } = req.params;
        
        try {
        const user = await this.userDao.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

            await this.userDao.convertirAdmin(userId);

            res.redirect('/adminHome')

        } catch (error) {
            console.log(error)
            res.status(404).render("error/error", { status: error });   
        }
    }

    
}

module.exports = UserController;