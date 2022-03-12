import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { sign } from 'jsonwebtoken';
import 'reflect-metadata';

import { TYPES } from '../types';
import { ValidateMiddleware } from '../common/validate.middleware';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { IConfigService } from '../config/config.service.interface';

import { IUserController } from './user.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUsersService } from './users.service.interface';
import { AuthGuard } from '../common/auth.guard';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUsersService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { body } = req;

		const result = await this.userService.validateUser(body);

		if (!result) {
			return next(new HTTPError(401, 'ошибка авторизации', 'login'));
		}

		const secret = this.configService.get('SECRET');
		const jwt = await this.signJWT(body.email, secret);
		this.ok(res, { jwt });
	}

	async register(
		req: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(req.body);

		if (!result) {
			return next(new HTTPError(422, 'Пользователь уже существует'));
		}

		this.ok(res, { email: result.email, id: result.id });
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(error, token) => {
					if (error) {
						reject(error);
					}

					resolve(token as string);
				},
			);
		});
	}

	async info(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { user } = req;

		const userInfo = await this.userService.getUserInfo(user);
		this.ok(res, { email: userInfo?.email, id: userInfo?.id });
	}
}
