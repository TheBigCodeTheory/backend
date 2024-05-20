import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Collection, Connection } from 'mongoose';
import { AppModule } from '../../../app.module';
import { DbRepository } from '../../db/db.repository';
import { Auth } from '../entities/auth.entity';
import { User } from '../../user/entities/user.entity';
import * as request from 'supertest';
import { ObjectId } from 'mongodb';

describe('/auth', () => {
  let codeForNewRegister: string;

  let app: INestApplication;
  let dbConnection: Connection;
  let authCollection: Collection<Auth>;
  let userCollection: Collection<User>;
  let httpServer: any;
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
  });
  afterAll(async () => {
    await authCollection.deleteMany({});
    await userCollection.deleteMany({});
    await app.close();
  });
  describe('/register', () => {
    it('POST first creation ', async () => {
      const response = await request(httpServer).post('/auth/register').send({
        email: 'eze_auth@gmail',
        firstname: 'eze',
        lastname: 'villa',
      });

      const authId = response.body.auth as string;

      const auth = await authCollection.findOne({
        _id: new ObjectId(authId),
      });
      codeForNewRegister = auth.code;
      expect(response.statusCode).toBe(201);
    });
    it('POST second creation ', async () => {
      const response = await request(httpServer).post('/auth/register').send({
        email: 'eze_auth@gmail',
        firstname: 'eze',
        lastname: 'villa',
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('/login', () => {
    it('POST Login correct credentials', async () => {
      const response = await request(httpServer).post('/auth/token').send({
        email: 'eze_auth@gmail',
        code: codeForNewRegister,
      });

      expect(response.statusCode).toBe(201);
    });
    it('POST Login incorrect code', async () => {
      const response = await request(httpServer).post('/auth/token').send({
        email: 'eze_auth@gmail',
        code: '123123123',
      });
      expect(response.statusCode).toBe(401);
    });
    it('POST Login incorrect email', async () => {
      const response = await request(httpServer).post('/auth/token').send({
        email: 'eze123123@gmail',
        code: codeForNewRegister,
      });
      expect(response.statusCode).toBe(401);
    });
  });
});
