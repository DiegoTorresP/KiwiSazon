const User = require("../models/users")
const Notificacion = require("../models/notificaciones")
const NoticacionesDao = require('../dao/notificaciones.dao');
const { Observable, Subject, async } = require('rxjs');
const userStatusSubject = require('../public/js/notification');

class NotificacionesController {
    constructor() {
        this.notificacionesDao = new NoticacionesDao();
    }

    marcarLeidas = async (req, res) => {    
        try {
          await this.notificacionesDao.marcarLeidas();
          res.redirect('back');
        } catch (error) {
          console.log(error);
          res.status(404).render('error/error', { status: error });
        }
      };
    }

    module.exports = NotificacionesController;