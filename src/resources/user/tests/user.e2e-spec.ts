import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Collection, Connection } from 'mongoose';
import { AppModule } from '../../../app.module';
import { DbRepository } from '../../db/db.repository';
import { Auth } from '../../auth/entities/auth.entity';
import { User } from '../entities/user.entity';
import * as request from 'supertest';
import { ObjectId } from 'mongodb';
import { MockTest } from '../../../lib/common/test/mocks';

describe('/user', () => {
  let app: INestApplication;
  let dbConnection: Connection;
  let authCollection: Collection<Auth>;
  let userCollection: Collection<User>;
  let httpServer: any;
  let adminUser: { authId: string; userId: string; token: string };
  let mockTest: MockTest;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef.get<DbRepository>(DbRepository).getDbHandle();
    authCollection = dbConnection.collection('auths');
    userCollection = dbConnection.collection('users');
    httpServer = app.getHttpServer();
    mockTest = new MockTest(app, dbConnection, httpServer);
    adminUser = await mockTest.createUser(
      'eze_user@gmail.com',
      'eze',
      'villa',
      true,
    );
  });
  afterAll(async () => {
    await authCollection.deleteMany({});
    await userCollection.deleteMany({});
    await app.close();
  });

  describe('/me', () => {
    it('GET success', async () => {
      const response = await request(httpServer)
        .get('/user/me')
        .set('Authorization', `Bearer ${adminUser.token}`);
      // console.log({ body: response.body });
      expect(response.statusCode).toBe(200);
    });
    it('GET unauthorized', async () => {
      const response = await request(httpServer)
        .get('/user/me')
        .set('Authorization', `Bearer ${''}`);
      expect(response.statusCode).toBe(401);
    });
  });
  describe('/admin/:id', () => {
    it('PATCH unauthorized', async () => {
      const notAdminUser = await mockTest.createUser(
        'eze_user2@gmail',
        'eze_no_admin',
        'villa',
      );
      const response = await request(httpServer)
        .patch(`/user/admin/${notAdminUser.userId}`)
        .set('Authorization', `Bearer ${''}`);
      expect(response.statusCode).toBe(401);
    });
    it('PATCH success', async () => {
      const notAdminUser = await mockTest.createUser(
        'eze_user3@gmail',
        'eze_no_admin',
        'villa',
      );
      const adminResponse = await request(httpServer)
        .patch(`/user/admin/${notAdminUser.userId}`)
        .set('Authorization', `Bearer ${adminUser.token}`);
      expect(adminResponse.statusCode).toBe(200);
    });
    it('PATCH bad id', async () => {
      const randomID = new ObjectId();
      const response = await request(httpServer)
        .patch(`/user/admin/${randomID}`)
        .set('Authorization', `Bearer ${adminUser.token}`);
      expect(response.statusCode).toBe(400);
    });
  });
});
