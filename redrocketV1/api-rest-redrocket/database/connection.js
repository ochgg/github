const mysql = require("mysql2/promise");

const connection = async () => {
    try {
      const dbConnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      });
  
      console.log('Conectado correctamente a la base de datos: REDROCKET');
      return dbConnection;
    } catch (error) {
      console.log(error);
      throw new Error('No se ha podido conectar a la base de datos');
    }
  };
  
module.exports = connection;
