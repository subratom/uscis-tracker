import { init } from '@sentry/node';
import { ILogger }  from './ILogger';

export class LoggerManager {
  private static logger: ILogger;

  public static setLogger(logger:ILogger): ILogger {
    return LoggerManager.logger = logger;
}

public static getLogger(): ILogger {
    if (!LoggerManager.logger) {
        throw new Error(`Logger isn't initialized. Please call setLogger first.`);
    }
    return LoggerManager.logger;
}


public static log(message: string): void {
    LoggerManager.getLogger().log(message);
}

public static error(message: string): void {
    LoggerManager.getLogger().error(message);
}

public static warn(message: string): void {
    LoggerManager.getLogger().warn(message);
}

public static info(message: string): void {
    LoggerManager.getLogger().info(message);
}

};