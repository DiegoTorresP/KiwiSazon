var admin = require("firebase-admin");
var serviceAccount = require("./kiwisazonp-firebase-adminsdk-b8gdk-642df4e9e7.json");


class FirebaseDB {
  constructor() {
    this.bucket = null;
  }

  async connect() {
    if (!this.bucket) {
      try {
        this.bucket = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: "gs://kiwisazonp.appspot.com"
          });
        console.log('Firebase Inicializado');
      } catch (error) {
        console.error('Error en la conexion de Firebase:', error);
      }
    }

    return this.bucket;
  }
}

module.exports = new FirebaseDB();