#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import {
	getKeyValue,
	saveKeyValue,
	TOKEN_DICTIONARY,
} from "./services/storage.service.js";
import {
	printerError,
	printerSuccess,
	printHelp,
	printWeather,
} from "./services/log.service.js";
import { getIcon, getWeather } from "./services/api.service.js";

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

const saveCity = async (city) => {
	if (!city.length) {
		printerError("Город не передан");
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printerSuccess("Город сохранён");
	} catch (e) {
		printerError(e.message);
	}
};

const getForcast = async () => {
	try {
		const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
		const weather = await getWeather(city);
		printWeather(weather, getIcon(weather.weather[0].icon));
	} catch (e) {
		if (e?.response?.status === 404) {
			printerError("Неверно указан город");
		} else if (e?.response?.status === 401) {
			printerError("Неверно указан токен");
		} else {
			printerError(e.message);
		}
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		return printHelp();
	}

	if (args.s) {
		return saveCity(args.s);
	}

	if (args.t) {
		return saveToken(args.t);
	}

	return getForcast();
};

initCLI();
