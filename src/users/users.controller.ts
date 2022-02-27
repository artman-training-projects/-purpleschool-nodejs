import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import "reflect-metadata";

import { TYPES } from "../types";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { ILogger } from "../logger/logger.interface";

@injectable()
export class UserController extends BaseController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: "/login", method: "post", func: this.login },
			{ path: "/register", method: "post", func: this.register },
		]);
	}

	login(req: Request, res: Response, next: NextFunction) {
		next(new HTTPError(401, "Ошибка авторизации", "login"));
	}

	register(req: Request, res: Response, next: NextFunction) {
		this.ok(res, "register");
	}
}
