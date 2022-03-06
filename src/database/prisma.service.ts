import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] успешно подключились к БД');
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error('[PrismaService] ошибка подключения к БД' + error.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
