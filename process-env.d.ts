export {};

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        [key: string]: string | undefined;
        PORT: string;
        DATABASE_URL: string;
        DO_API_TOKEN: string;
        MONGO_URI: string;
        VAULT_ADDR: string;
        VAULT_TOKEN: string;
        REDIS_URL: string;
        SENTRY_DSN: string;
        // add more environment variables and their types here
      }
    }
  }