import request from 'supertest';
import server from '../api';

jest.setTimeout(40000);

describe('Drivers', () => {
  let app;
  beforeAll(() => {
    app = server;
    return app.close();
  });

  afterAll(() => app.close());
  describe('Testing drivers routes', () => {
    it('it should fail to fetch one driver', async () => {
      const res = await request(app).get('/api/v1/drivers/$1234');
      expect(res.statusCode).toEqual(400);
      expect(res.body.data).toBeDefined();
    });
    it('it should fetch one driver', async () => {
      const res = await request(app).get('/api/v1/drivers/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toBeDefined();
    });
    it('it should fail to fetch unregistered driver', async () => {
      const res = await request(app).get('/api/v1/drivers/34');
      expect(res.statusCode).toEqual(404);
      expect(res.body.data).toBeDefined();
    });
    it('it should fetch all drivers', async () => {
      const res = await request(app).get('/api/v1/drivers');
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('All drivers');
    });
    it('it should fetch available drivers', async () => {
      const res = await request(app).get('/api/v1/drivers/available');
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Available drivers');
    });
    it('it should fetch nearBy drivers', async () => {
      const res = await request(app).get(
        '/api/v1/drivers/available/Bank of Kigali, Giporoso Branch, Kigali'
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual(
        'Available drivers near Bank of Kigali, Giporoso Branch, Kigali'
      );
    });
    it('it should fail fetch nearBy drivers, incomplete location', async () => {
      const res = await request(app).get('/api/v1/drivers/available/remera');
      expect(res.statusCode).toEqual(500);
      expect(res.body.message).toEqual('response.split is not a function');
    });
  });
});
