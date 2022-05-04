const swaggerJSDoc = require('swagger-jsdoc');
/**
 * @file This file configure swagger api docs for the end users.
 */
const options = {
  definition: {
    info: {
      title: 'Node Starter API Document',
      version: '1.0.0',
    },
    schemes: [
      'http',
      'https',
    ],
    produces: ['application/x-www-form-urlencoded', 'application/json'],
    consumes: ['application/x-www-form-urlencoded', 'application/json'],
    securityDefinitions: {
      Basic: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    basePath: '/api/',
  },
  apis: ['./src/routes/*.js'],
};

export default swaggerJSDoc(options);
