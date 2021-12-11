#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { saveKeyValue } from "./services/storage.service.js";
import {
	printerError,
	printerSuccess,
	printHelp,
} from "./services/log.service.js";

const saveToken = async (token) => {
	try {
		await saveKeyValue("token", token);
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

	// show weather
};

initCLI();
