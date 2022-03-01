import { Logger } from 'tslog';
import { injectable } from 'inversify';
import 'reflect-metadata';

import { ILogger } from './logger.interface';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger;

	constructor() {
		this.logger = new Logger({
			displayLoggerName: false,
			displayInstanceName: false,
			displayFunctionName: false,
			displayFilePath: 'hidden',
		});
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}

	error(...args: unknown[]): void {
		// отправка в sentry / rollbar
		this.logger.error(...args);
	}
}
