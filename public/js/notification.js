const { Observable, Subject } = require('rxjs');
const userStatusSubject = new Subject();
const userDao = require('../../dao/admin.dao')
const user = new userDao();
  userStatusSubject.subscribe({
    next(value) {
      // Maneja los cambios de estado del usuario
      console.log(`El usuario con ID ${value.userId} ha sido ${value.isActive ? 'activado' : 'desactivado'}`);
      // Ejecuta tu lógica adicional aquí
      user.notificar(value.userId, `El usuario ha sido ${value.isActive ? 'activado' : 'desactivado'}`)
    },
    error(err) {
      console.error(err);
    },
    complete() {
      console.log('Subject completado');
    },
  });

module.exports = userStatusSubject;
