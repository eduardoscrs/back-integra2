import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import { pool } from './config/db.js'; // Asegúrate de que la ruta sea correcta
import userroute from './routes/userroute.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userroute);


// Prueba de conexión a la base de datos
// pool
//   .getConnection()
//   .then((connection) => {
//     console.log('Conexión a la base de datos exitosa');
//     connection.release(); // Liberar la conexión
//   })
//   .catch((err) => {
//     console.error('Error al conectar a la base de datos:', err.message);
//   });

export default app;
