/* eslint-disable jest/expect-expect */
import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let superTest: request.SuperTest<request.Test>;

  const loginUrl = '/auth/login';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
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
    it('should return an accesstoken on successful login', async () => {
      const response = await logInAsAdmin();

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(typeof response.body.accessToken).toBe('string');
    });

    it('should throw an unauthorized error when failed to login', async () => {
      const response = await superTest.post(loginUrl).send({
        username: 'john',
        password: 'j',
      });

      expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
    });
  });

});
