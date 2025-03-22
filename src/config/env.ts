import { fetchSecrets } from "./doSecrets";
import dotenv from 'dotenv';

dotenv.config();

export const loadSecrets = async () => {
    const secretName = 'tracker-secrets'; // Update this to your secret name in DO Secrets Manager

    try {
        const secrets = await fetchSecrets(secretName);
        console.log(secrets);
        if (!secrets) {
            throw new Error('Secrets not found');
        }
        return {
            mongoUri: secrets.MONGO_URI,
            do_api_token: secrets.DO_API_TOKEN,
            // pgHost: secrets.POSTGRES_HOST,
            // pgPort: parseInt(secrets.POSTGRES_PORT, 10),
            // pgUser: secrets.POSTGRES_USER,
            // pgPassword: secrets.POSTGRES_PASSWORD,
            // pgDatabase: secrets.POSTGRES_DATABASE,
          };
    } catch (error) {
        console.error('Error loading secrets:', error);
    }
}  