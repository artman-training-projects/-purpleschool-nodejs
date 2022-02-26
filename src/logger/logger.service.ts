import { Logger } from "tslog";

export class LoggerService {
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
