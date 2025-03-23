import { Connection } from "pg";
import { LoggerManager } from "../common/logger/LoggerManager";

let postgresConnection: Connection | null = null;

export const getPostgresDataSource = (): Connection => {
    if (!postgresConnection) {
        LoggerManager.error('Postgres connection not established');
        throw new Error('Postgres connection not established');
    }
    return postgresConnection;
};
    