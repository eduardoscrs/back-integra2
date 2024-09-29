import app from './app.js'; // Importa la aplicación de Express

const port = process.env.PORT || 3000; // Establece el puerto

app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Mensaje de inicio del servidor
});
