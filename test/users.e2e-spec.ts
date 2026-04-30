import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './helpers/create-test-app';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let adminToken: string;
  let developerToken: string;
  let userToken: string;
  let userId: number;

  async function login(username: string, password: string): Promise<string> {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username, password });
    return res.body.access_token;
  }

  beforeAll(async () => {
    app = await createTestApp();

    // admin is seeded on bootstrap
    adminToken = await login('admin', 'admin123');

    // Create a developer user via DEVELOPER role (admin creates it and promotes)
    const devRes = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ nombre: 'Dev User', username: 'devuser', password: 'devpass1' });
    const devId = devRes.body.id;
    await request(app.getHttpServer())
      .patch(`/users/${devId}/make-admin`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ role: 'DEVELOPER' });
    developerToken = await login('devuser', 'devpass1');

    // Create a regular user
    const userRes = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ nombre: 'Regular User', username: 'regularuser', password: 'userpass1' });
    userId = userRes.body.id;
    userToken = await login('regularuser', 'userpass1');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users', () => {
    it('ADMIN sees all users', async () => {
      const res = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });

    it('DEVELOPER sees all users', async () => {
      const res = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${developerToken}`)
        .expect(200);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });

    it('USER sees only own profile', async () => {
      const res = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].username).toBe('regularuser');
    });

    it('returns 401 without token', async () => {
      await request(app.getHttpServer()).get('/users').expect(401);
    });

    it('never exposes password in response', async () => {
      const res = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      res.body.forEach((u: any) => expect(u.password).toBeUndefined());
    });
  });

  describe('POST /users', () => {
    it('DEVELOPER can create a user', async () => {
      const res = await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', `Bearer ${developerToken}`)
        .send({ nombre: 'New Person', username: 'newperson', password: 'newpass1' })
        .expect(201);
      expect(res.body.username).toBe('newperson');
      expect(res.body.password).toBeUndefined();
    });

    it('USER cannot create a user (403)', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ nombre: 'Forbidden', username: 'forbidden', password: 'forbpass1' })
        .expect(403);
    });
  });

  describe('PATCH /users/:id', () => {
    it('DEVELOPER can update a user', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .set('Authorization', `Bearer ${developerToken}`)
        .send({ nombre: 'Updated Name' })
        .expect(200);
      expect(res.body.nombre).toBe('Updated Name');
    });

    it('USER cannot update (403)', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ nombre: 'Hacked' })
        .expect(403);
    });
  });

  describe('PATCH /users/:id/make-admin', () => {
    it('ADMIN can assign any role', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/users/${userId}/make-admin`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ role: 'ADMIN' })
        .expect(200);
      expect(res.body.role).toBe('ADMIN');
    });

    it('DEVELOPER cannot assign roles (403)', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${userId}/make-admin`)
        .set('Authorization', `Bearer ${developerToken}`)
        .send({ role: 'ADMIN' })
        .expect(403);
    });
  });

  describe('DELETE /users/:id', () => {
    it('DEVELOPER cannot delete (403)', async () => {
      await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${developerToken}`)
        .expect(403);
    });

    it('ADMIN can delete a user', async () => {
      const reg = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ nombre: 'ToDelete', username: 'todelete', password: 'delpass1' });
      await request(app.getHttpServer())
        .delete(`/users/${reg.body.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });
});
