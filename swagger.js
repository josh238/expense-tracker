// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Expense Tracker API',
      version: '1.0.0',
      description: 'API documentation for Expense Tracker',
    },
  },
  apis: ['./src/routes/*.js'], // adjust path to your routes
};

const swaggerSpec = swaggerJsDoc(options);

// 👉 Export swaggerUi.serve and swaggerUi.setup correctly
module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerSpec),
};
