import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { Connection, Collection } from 'mongoose';
import { Auth } from '../../../resources/auth/entities/auth.entity';
import * as request from 'supertest';
import { ROLE } from '../types';
import { ObjectId } from 'mongodb';
import { User } from '../../../resources/user/entities/user.entity';

export class MockTest {
  app: INestApplication;
  dbConnection: Connection;
  authCollection: Collection<Auth>;
  userCollection: Collection<User>;
  httpServer: any;
  authId: string;
  userId: string;
  token: string;

  constructor(
    app: INestApplication,
    dbConnection: Connection,
    httpServer: any,
  ) {
    this.app = app;
    this.dbConnection = dbConnection;
    this.httpServer = httpServer;
    this.authCollection = this.dbConnection.collection('auths');
    this.userCollection = this.dbConnection.collection('users');
  }

  async createUser(
    email: string,
    firstname: string,
    lastname: string,
    admin?: boolean,
  ) {
    const response = await request(this.httpServer)
      .post('/auth/register')
      .send({
        email,
        firstname,
        lastname,
      });

    this.authId = response.body.auth as string;

    const auth = await this.authCollection.findOne({
      _id: new ObjectId(this.authId),
    });

    const code = auth.code;
    const responseLogin = await request(this.httpServer)
      .post('/auth/token')
      .send({
        email,
        code,
      });
    this.userId = responseLogin.body.user.id;
    this.token = responseLogin.body.token;
    if (admin) {
      await this.userCollection.updateOne(
        { _id: new ObjectId(this.userId) },
        { $push: { roles: ROLE.ADMIN } },
      );
      const responseLogin = await request(this.httpServer)
        .post('/auth/token')
        .send({
          email,
          code,
        });
      this.token = responseLogin.body.token;
    }
    return {
      authId: this.authId,
      userId: this.userId,
      token: this.token,
    };
  }
}
