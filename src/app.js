import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/db.js';
dotenv.config();

const casoRouter = require('./routes/casoRoutes');
const app = express();
app.use(cors());
app.use(express.json());
// apis
app.use('/api/casos', casoRouter);

//Prueba de conexión a la base de datos
pool
  .getConnection()
  .then((connection) => {
    console.log('Conexión a la base de datos exitosa');
    connection.release(); // Liberar la conexión
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err.message);
  });

export default app;
