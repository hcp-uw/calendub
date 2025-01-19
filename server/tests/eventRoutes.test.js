const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Event API', () => {
  test('GET /api/events should return an empty array initially', async () => {
    const res = await request(app).get('/api/events');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /api/events should create a new event', async () => {
    const newEvent = {
      title: 'Writing this test',
      startTime: new Date(2025, 0, 19, 12, 58),
      endTime: new Date(2025, 0, 19, 12, 59)
    };

    const res = await request(app).post('/api/events').send(newEvent);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(newEvent.title);

    const getRes = await request(app).get('/api/events');
    expect(getRes.body.length).toBe(1);
    expect(getRes.body[0].title).toBe(newEvent.title);
  });

  test('POST /api/events should validate required fields', async () => {
    const invalidEvent = {
      title: 'Invalid Event',
    };

    const res = await request(app).post('/api/events').send(invalidEvent);
    expect(res.statusCode).toBe(400); 
    expect(res.body.message).toBeDefined();
  });
});
