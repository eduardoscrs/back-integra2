import express from 'express';
import casoRoutes from './routes/casoRoutes.js'; // Asegúrate de que la ruta es correcta
import app from './app.js';

app.use(express.json()); // Middleware para parsear JSON

app.use('/casos', casoRoutes); // Asegúrate de que '/casos' es el prefijo correcto

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
