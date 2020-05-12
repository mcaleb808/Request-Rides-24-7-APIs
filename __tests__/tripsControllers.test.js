import request from 'supertest';
import server from '../api';

describe('Trips', () => {
  let app;
  beforeAll(() => {
    app = server;
    return app.close();
  });

  afterAll(() => app.close());
  describe('Testing trips routes', () => {
    it('it should fetch active trips', async () => {
      const res = await request(app).get('/api/v1/trips');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toBeDefined();
    });
    it('it should create a trip', async () => {
      const res = await request(app)
        .post('/api/v1/trips')
        .send({
          pickUpPoint: 'remera, kigali',
          destination: 'kimironko, kigali',
          riderId: 1,
          driverId: 1
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toBeDefined();
    });
    it('it should fail to create a trip', async () => {
      const res = await request(app)
        .post('/api/v1/trips')
        .send({
          pickUpPoint: 'remera, kigali',
          destination: 'kimironko, kigali',
          riderId: 10,
          driverId: 1
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body.data).toBeDefined();
    });
    it('it should fail to create a trip, driver not found', async () => {
      const res = await request(app)
        .post('/api/v1/trips')
        .send({
          pickUpPoint: 'remera, kigali',
          destination: 'kimironko, kigali',
          riderId: 10,
          driverId: 19
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body.data).toBeDefined();
    });
    it('it should fail to create a trip, validation', async () => {
      const res = await request(app)
        .post('/api/v1/trips')
        .send({
          pickUpPoi: 'remera, kigali',
          destination: 'kimironko, kigali',
          riderId: 10,
          driverId: 19
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.data).toBeDefined();
    });
    it('it should complete a trip with id 1', async () => {
      const res = await request(app).put('/api/v1/trips/1/complete');
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toBeDefined();
    });
    it('it should fail to complete trip with id 1, (already completed)', async () => {
      const res = await request(app).put('/api/v1/trips/1/complete');
      expect(res.statusCode).toEqual(404);
      expect(res.body.data).toBeDefined();
    });
  });
});
