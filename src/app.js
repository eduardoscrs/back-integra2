const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

// Middlewares globales

// Rutas
const userRoutes = require('./routes/userRoutes');
const casoRoutes = require('./routes/casoRoutes');

app.use('/api/users', userRoutes);
app.use('/api/casos', casoRoutes);

// Manejo de errores
app.use(errorHandler);

module.exports = app;
