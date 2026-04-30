import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './helpers/create-test-app';

describe('Photos (e2e)', () => {
  let app: INestApplication;
  let adminToken: string;
  let developerToken: string;
  let userToken: string;

  async function login(username: string, password: string): Promise<string> {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username, password });
    return res.body.access_token;
  }

  beforeAll(async () => {
    app = await createTestApp();

    adminToken = await login('admin', 'admin123');

    const devRes = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ nombre: 'Photo Dev', username: 'photodev', password: 'devpass1' });
    await request(app.getHttpServer())
      .patch(`/users/${devRes.body.id}/make-admin`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ role: 'DEVELOPER' });
    developerToken = await login('photodev', 'devpass1');

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ nombre: 'Photo User', username: 'photouser', password: 'userpass1' });
    userToken = await login('photouser', 'userpass1');

    // Seed: one public and one private photo
    await request(app.getHttpServer())
      .post('/photos')
      .set('Authorization', `Bearer ${developerToken}`)
      .send({ Title: 'Public Photo', Privacy: 'public' });

    await request(app.getHttpServer())
      .post('/photos')
      .set('Authorization', `Bearer ${developerToken}`)
      .send({ Title: 'Private Photo', Privacy: 'private' });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /photos', () => {
    it('USER sees only public photos', async () => {
      const res = await request(app.getHttpServer())
        .get('/photos')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
      expect(res.body.every((p: any) => p.Privacy === 'public')).toBe(true);
      expect(res.body.find((p: any) => p.Title === 'Public Photo')).toBeDefined();
      expect(res.body.find((p: any) => p.Title === 'Private Photo')).toBeUndefined();
    });

    it('DEVELOPER sees all photos', async () => {
      const res = await request(app.getHttpServer())
        .get('/photos')
        .set('Authorization', `Bearer ${developerToken}`)
        .expect(200);
      expect(res.body.find((p: any) => p.Title === 'Private Photo')).toBeDefined();
    });

    it('ADMIN sees all photos', async () => {
      const res = await request(app.getHttpServer())
        .get('/photos')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(res.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('POST /photos with tagIds', () => {
    it('persists tags on the photo', async () => {
      const tagRes = await request(app.getHttpServer())
        .post('/tags')
        .set('Authorization', `Bearer ${developerToken}`)
        .send({ Title: 'Nature' });
      const tagId = tagRes.body.ID;

      const photoRes = await request(app.getHttpServer())
        .post('/photos')
        .set('Authorization', `Bearer ${developerToken}`)
        .send({ Title: 'Tagged Photo', Privacy: 'public', tagIds: [tagId] })
        .expect(201);

      expect(photoRes.body.tags).toBeDefined();
      expect(photoRes.body.tags.some((t: any) => t.ID === tagId)).toBe(true);
    });
  });

  describe('POST /photos guards', () => {
    it('USER cannot create a photo (403)', async () => {
      await request(app.getHttpServer())
        .post('/photos')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ Title: 'Forbidden', Privacy: 'public' })
        .expect(403);
    });
  });
});
