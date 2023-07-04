const User = require("../models/users")
const UserDao = require('../dao/admin.dao');

class UserController {
    constructor() {
        this.userDao = new UserDao();
    }

    deactivateUser = async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await this.userDao.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            await this.userDao.desactivarUsuario(userId);

            res.redirect('/adminHome')
        } catch (error) {
            console.log(error)
            res.status(404).render("error/error", { status: error });
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