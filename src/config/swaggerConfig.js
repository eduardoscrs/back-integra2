import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Integra API',
    version: '1.0.0',
    description: 'Documentación de la API de Integra',
  },
  servers: [
    {
      url: 'http://localhost:3000', 
      description: 'Servidor local',
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{
    bearerAuth: [],
  }],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/casoRoutes.js'], // Rutas donde Swagger buscará la documentación
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
