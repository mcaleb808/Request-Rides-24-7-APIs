import request from 'supertest';
import server from '../api';

describe('Riders', () => {
  let app;
  beforeAll(() => {
    app = server;
    return app.close();
  });

  afterAll(() => app.close());
  describe('Testing riders routes', () => {
    it('it should fail to fetch one rider', async () => {
      const res = await request(app).get('/api/v1/riders/$1234');
      expect(res.statusCode).toEqual(400);
      expect(res.body.data).toBeDefined();
    });
    it('it should fetch one rider', async () => {
      const res = await request(app).get('/api/v1/riders/2');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toBeDefined();
    });
    it('it should fetch all riders', async () => {
      const res = await request(app).get('/api/v1/riders');
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('All riders');
    });
    it('it should fetch nearBy drivers', async () => {
      const res = await request(app).get('/api/v1/riders/nearByDrivers/remera,kigali');
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Available drivers');
    });
  });
});
