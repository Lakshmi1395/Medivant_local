// swagger.ts
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { OpenAPIV3 } from 'openapi-types';

export type SwaggerRoutes = string[];

export function generateSwagger(
  title: string,
  version: string,
  routes: SwaggerRoutes
): OpenAPIV3.Document {
  const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title,
        version,
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: routes,
  };

  const spec = swaggerJsdoc(swaggerOptions) as OpenAPIV3.Document;
  return spec;
}

export function serveSwagger(
  app: Application,
  swaggerSpec: OpenAPIV3.Document,
  route = '/api-docs'
): void {
  const uiOptions = {
    explorer: true,
    swaggerOptions: {
      filter: true,          
      docExpansion: 'list',  
      persistAuthorization: true,
      // showExtensions: true,
      // displayOperationId: false,
    },
  };
  app.use(route, swaggerUi.serve, swaggerUi.setup(swaggerSpec, uiOptions));
}
