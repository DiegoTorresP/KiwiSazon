const mongoose = require("mongoose");
const dbConfig = require('./dbConfig');

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    if (!this.connection) {
      try {
        this.connection = await mongoose.connect(dbConfig.url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('Base de Datos Conectada');
      } catch (error) {
        console.error('Error en la Base de Datos:', error);
      }
    }

    return this.connection;
  }
}

module.exports = new Database();
