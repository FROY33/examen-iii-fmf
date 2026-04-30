import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './helpers/create-test-app';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/register', () => {
    it('creates a USER-role account without exposing password', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ nombre: 'Alice', username: 'alice', password: 'secret99' })
        .expect(201);

      expect(res.body.username).toBe('alice');
      expect(res.body.role).toBe('USER');
      expect(res.body.password).toBeUndefined();
    });

    it('rejects missing fields with 400', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ username: 'incomplete' })
        .expect(400);
    });
  });

  describe('POST /auth/login', () => {
    beforeAll(async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ nombre: 'Bob', username: 'bob', password: 'bobpass1' });
    });

    it('returns a JWT containing id, username, and role', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'bob', password: 'bobpass1' })
        .expect(200);

      expect(res.body.access_token).toBeDefined();
      const [, payload] = res.body.access_token.split('.');
      const decoded = JSON.parse(Buffer.from(payload, 'base64').toString());
      expect(decoded.id).toBeDefined();
      expect(decoded.username).toBe('bob');
      expect(decoded.role).toBe('USER');
    });

    it('returns 401 for wrong password', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'bob', password: 'wrongpass' })
        .expect(401);
    });

    it('returns 401 for unknown username', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'nobody', password: 'anything' })
        .expect(401);
    });
  });
});
