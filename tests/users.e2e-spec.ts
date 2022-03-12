import request from 'supertest';

import { App } from '../src/app';
import { boot } from '../src/main';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	test('Register - error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: 'aa@aa.com', password: '1' });

		expect(res.statusCode).toBe(422);
	});

	test('Login - success', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'aa@aa.com', password: 'abc' });

		expect(res.body.jwt).not.toBeUndefined();
	});

	test('Login - error', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'aa@aa.com', password: '1' });

		expect(res.statusCode).toBe(401);
	});

	test('Info - success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'aa@aa.com', password: 'abc' });

		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);

		expect(res.body.email).toBe('aa@aa.com');
	});

	test('Info - error', async () => {
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer 1`);

		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
