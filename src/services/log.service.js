import chalk from "chalk";
import dedent from "dedent-js";

export const printerError = (error) => {
	console.log(chalk.bgRed(" ERROR ") + " " + error);
};

export const printerSuccess = (message) => {
	console.log(chalk.bgGreen(" SUCCESS ") + " " + message);
};

export const printHelp = () => {
	console.log(
		dedent(`${chalk.bgCyan(" HELP ")}
		Без параметров - вывод погоды
		-s [CITY] - установка города
		-h - вывод помощи
		-t [API_KEY] - сохранить токен`)
	);
};
