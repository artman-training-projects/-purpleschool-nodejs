#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";
import {
	printerError,
	printerSuccess,
	printHelp,
} from "./services/log.service.js";
import { getWeather } from "./services/api.service.js";

const saveToken = async (token) => {
	if (!token.length) {
		printerError("Токен не передан");
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printerSuccess("Токен сохранён");
	} catch (e) {
		printerError(e.message);
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		printHelp();
	}

	if (args.s) {
		// save city
	}

	if (args.t) {
		return saveToken(args.t);
	}

	getWeather("moscow");
};

initCLI();
