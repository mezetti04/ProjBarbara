// config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export function setupSwagger(app: Express) {
  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Entregas e Veículos',
        version: '1.0.0',
        description: 'Documentação da API usando Swagger',
      },
    },
    apis: ['./src/routes/*.ts'], // Caminho dos arquivos com comentários Swagger
  };

  const swaggerSpec = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
