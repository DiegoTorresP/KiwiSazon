const Notificacion = require('../models/notificaciones');
const { trace } = require('../routes/admin');
const mongoose = require('mongoose');

class NoticacionesDAO{
    async marcarLeidas() {
        try {
            const notificaciones = await Notificacion.updateMany({}, { isRead: 1 });
            return notificaciones;
            
          } catch (error) {
              throw new Error('No se pudo marcar las notificaciones');
          }
    }
}
module.exports = NoticacionesDAO;