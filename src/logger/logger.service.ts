import { Logger } from "tslog";
import { injectable } from "inversify";
import "reflect-metadata";

import { ILogger } from "./logger.interface";

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger;

	constructor() {
		this.logger = new Logger({
			displayLoggerName: false,
			displayInstanceName: false,
			displayFunctionName: false,
			displayFilePath: "hidden",
		});
	}

	log(...args: unknown[]) {
		this.logger.info(...args);
	}

	warn(...args: unknown[]) {
		this.logger.warn(...args);
	}

	error(...args: unknown[]) {
		this.logger.error(...args);
	}
}
