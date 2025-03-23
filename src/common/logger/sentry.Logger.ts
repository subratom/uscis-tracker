import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

import { ILogger } from './ILogger';

export class SentryLogger implements ILogger {
  constructor(dsn: string) {
    Sentry.init({
      dsn,
      integrations: [nodeProfilingIntegration],
      tracesSampleRate: 1.0,
    });
  }
    info(message: string): void {
        Sentry.captureMessage(message, { level: 'info' });
    }

  log(message: string): void {
    Sentry.captureMessage(message, { level: 'info' });
  }

  error(error: string): void {
    Sentry.captureException(error, { level: 'info' });
  }

    warn(message: string): void {
        Sentry.captureMessage(message, { level: 'warning' });
    }

    debug(message: string): void {
        Sentry.captureMessage(message, { level: 'debug' });
    }
}

