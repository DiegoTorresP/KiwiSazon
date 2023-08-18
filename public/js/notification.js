const { Observable, Subject } = require('rxjs');
const userStatusSubject = new Subject();
const userDao = require('../../dao/admin.dao')
const user = new userDao();
  userStatusSubject.subscribe({
    next(value) {
      // Ejecuta tu lógica adicional aquí
      user.notificarReceta(value.id, `Tu receta: ${value.sNombreReceta} ha sido ${value.isApro ? 'aprobada!' : 'rechazada, revisa los comentarios de la administración'}`)
    },
    error(err) {
      console.error(err);
    },
    complete() {
      console.log('Subject completado');
    },
  });

module.exports = userStatusSubject;
