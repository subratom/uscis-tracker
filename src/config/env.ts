import { fetchSecrets } from "./doSecrets";
import dotenv from 'dotenv';
import { LoggerManager } from '../common/logger/LoggerManager';

dotenv.config();

export const loadSecrets = async () => {
    const secretName = 'tracker-secrets'; // Update this to your secret name in DO Secrets Manager

    try {
        const secrets = await fetchSecrets(secretName);

        if (!secrets) {
            LoggerManager.error(`Secrets not found`);
            throw new Error('Secrets not found');
        }

        const {
            MONGO_URI: mongoUri,
            DO_API_TOKEN: doApiToken,
            CLIENT_ID: clientId,
            CLIENT_SECRET: clientSecret,
            // Uncomment and map additional secrets as needed
            POSTGRES_HOST: pgHost,
            POSTGRES_PORT,
            POSTGRES_USER: pgUser,
            POSTGRES_PASSWORD: pgPassword,
            POSTGRES_DATABASE: pgDatabase,
        } = secrets;

        return {
            mongoUri,
            doApiToken,
            clientId,
            clientSecret,
            pgHost,
            pgPort: parseInt(POSTGRES_PORT, 10),
            pgUser,
            pgPassword,
            pgDatabase,
        };
    } catch (error) {
        LoggerManager.error(`'Error loading secrets:', ${error.message}`);
        throw error; // Re-throw the error to ensure the caller is aware of the failure
    }
};