import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'API documentation for Express API with Swagger',
      contact: {
        name: 'Swagger',
      },
      servers: ['http://localhost:3000'],
    },
  },
  apis: ['src/routes/v1/*.ts'],
};


export { swaggerOptions };