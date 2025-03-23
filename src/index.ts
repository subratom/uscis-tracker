// import { initSentry } from './config/sentry';
// import * as Sentry from '@sentry/node';

import { LoggerManager } from './common/logger/LoggerManager';
import { SentryLogger } from './common/logger/sentry.Logger';


import express from 'express';
import cors from 'cors';
import { loadSecrets } from './config/env';
import { connectMongo } from './db/mongodb';
// import { connectPostgres } from './db/postgres';
import caseRoutes from './routes/v1/caseRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { swaggerOptions } from './docs/swaggerOptions';

const PORT = process.env.PORT || 3000;

const createServer = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api', caseRoutes);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

  return app;
};

const startServer = async () => {
  try {
    // Initialize Sentry
    const sentryLogger = new SentryLogger(process.env.SENTRY_DSN);
    LoggerManager.setLogger(sentryLogger);

    // Load environment variables
    const env = await loadSecrets();

    // Connect to MongoDB
    await connectMongo(env.mongoUri);

    // Uncomment if PostgreSQL is needed
    // await connectPostgres();

    const app = createServer();

    // Start the server
    const server = app.listen(PORT, () => {
      LoggerManager.info(`🚀 Server running on http://localhost:${PORT}`);

      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('Shutting down server...');
      server.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    });

    process.on('SIGTERM', async () => {
      console.log('Shutting down server...');
      server.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    });
  } catch (error) {
    LoggerManager.error(`Error starting the server: ${error}`);
    process.exit(1);
  }
};

startServer();