import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/db.js';
import casoRouter from './routes/casoRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// apis
app.use('/api/casos', casoRouter);
app.use('/api/users', userRoutes);

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
