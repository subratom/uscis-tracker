import { MongoClient } from 'mongodb';
import { loadSecrets } from '../config/env';
import { LoggerManager } from '../common/logger/LoggerManager';

export async function saveCaseToDatabase(caseData: any): Promise<void> {
    try {

        const secrets = await loadSecrets(); 

        const client = new MongoClient(secrets.mongoUri);

        await client.connect();
        const database = client.db('uscis-tracker'); // Replace with your database name
        const collection = database.collection('uscisCases'); // Replace with your collection name

        const result = await collection.insertOne(caseData);
        LoggerManager.info(`Case inserted with _id: ${result.insertedId}`);
    } catch (error) {
        LoggerManager.error(`Error saving case to database : ${error}`);
    } finally {
        
    }
}