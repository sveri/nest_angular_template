/* eslint-disable jest/expect-expect */
import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from './../src/app.module';
import { ConnectionOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'poop',
  password: 'poop',
  database: 'poop_test',
  // entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  dropSchema: true,
};

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let superTest: request.SuperTest<request.Test>;

  const loginUrl = '/auth/login';
  const baseUrl = '/users';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    superTest = request(app.getHttpServer());
  });

  async function logInAsAdmin(): Promise<request.Response> {
    return await superTest.post(loginUrl).send({
      username: 'admin@localhost.de',
      password: 'john',
    });

  }


  describe(`/POST ${loginUrl}`, () => {
    it('should register a user that does not exist', async () => {
      const res = await superTest.post(baseUrl + '/register').send({
        email: 'foo@bar.de',
        password: 'pass',
      });

      expect(res.status).toBe(HttpStatus.CREATED);
      expect(res.body.email).toBe('foo@bar.de');
      expect(res.body.password).toBeUndefined();
    });

    it('should not register an existing user', async () => {
      let res = await superTest.post(baseUrl + '/register').send({
        email: 'foo@bar2.de',
        password: 'pass',
      });

      res = await superTest.post(baseUrl + '/register').send({
        email: 'foo@bar2.de',
        password: 'pass',
      });

      expect(res.status).toBe(HttpStatus.CONFLICT);
    });
  });

});
