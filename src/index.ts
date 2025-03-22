import express from 'express';
import cors from 'cors';
import { loadSecrets } from './config/env';


//import { env } from './config/env';
//import { connectMongo } from './db/mongo';
//import { connectPostgres } from './db/postgres';
import caseRoutes from './routes/caseRoutes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

(async () => {
    const env = await loadSecrets();
    //await connectMongo();
    //await connectPostgres();
    //app.use('/uscis', caseRoutes);
    //app.listen(PORT, () => {
    //  console.log(`🚀 Server running on http://localhost:${PORT}`);
    //});
    //console.log(env.mongoUri);
    //console.log(env.mongo.uri);
    //console.log(env.postgres.uri);
    //console.log(env.postgres.user);
    //console.log(env.postgres.password);
    //console.log(env.postgres.database);
    //console.log(env.postgres.host);
    //console.log(env.postgres.port);
    //console.log(env.postgres.ssl);
    //console.log(env.postgres.sslmode);
    //console.log(env.postgres.sslcert);
    //console.log(env.postgres.sslkey);
    //console.log(env.postgres.sslrootcert);
    //console.log(env.postgres.sslcrl);
    //console.log(env.postgres.sslpassphrase);
    //console.log(env.postgres.max);
    //console.log(env.postgres.idleTimeoutMillis);
    //console.log(env.postgres.connectionTimeoutMillis);
    //console.log(env.postgres.statement_timeout);
    //console.log(env.postgres.query_timeout);
    //console.log(env.postgres.poolSize);
    //console.log(env.postgres.poolIdleTimeout);
    //console.log(env.postgres.poolReapInterval
})();

app.use('/uscis', caseRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
