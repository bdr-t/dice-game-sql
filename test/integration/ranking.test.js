const request = require('supertest');
const mongoose = require('mongoose');
const httpStatus = require('http-status');

const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { userOne, insertUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

describe('Ranking routes', () => {
  const winner = {
    _id: mongoose.Types.ObjectId(),
    name: 'winner',
    games: [],
    succes_rate: 1,
    lost: 0,
    won: 1,
  };

  const loser = {
    _id: mongoose.Types.ObjectId(),
    name: 'loser',
    games: [],
    succes_rate: 0,
    lost: 1,
    won: 0,
  };

  const winner2 = {
    _id: mongoose.Types.ObjectId(),
    name: 'winner2',
    games: [],
    succes_rate: 1,
    lost: 0,
    won: 1,
  };

  const loser2 = {
    _id: mongoose.Types.ObjectId(),
    name: 'loser2',
    games: [],
    succes_rate: 0,
    lost: 1,
    won: 0,
  };

  describe('GET /', () => {
    test('should return 200 and successfully return the ranking of the players', async () => {
      await insertUsers([userOne, winner, loser]);

      const res = await request(app)
        .get('/ranking')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      const response = {
        users: [
          { name: 'winner', succes_rate: 1 },
          { name: 'loser', succes_rate: 0 },
        ],
      };
      expect(res.body.users).toEqual(response.users);
    });

    test('should return 200 if there are no users', async () => {
      await insertUsers([userOne]);
      const res = await request(app)
        .get(`/ranking`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        users: [],
      });
    });

    test('should return 401 error if access token is missing', async () => {
      await request(app).get(`/ranking`).expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe('GET /ranking/winner', () => {
    test('should return 200 and successfully return the winner', async () => {
      await insertUsers([userOne, winner, loser]);

      const res = await request(app)
        .get(`/ranking/winner`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      const expectedRes = [{ name: 'winner', succes_rate: 1 }];

      expect(res.body.users).toEqual(expectedRes);
    });
    test('should return 200 and successfully return more than one winer if they are tied', async () => {
      await insertUsers([userOne, winner, loser, winner2]);

      const res = await request(app)
        .get(`/ranking/winner`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      const expectedRes = [
        { name: 'winner', succes_rate: 1 },
        { name: 'winner2', succes_rate: 1 },
      ];

      expect(res.body.users).toEqual(expectedRes);
    });
    test('should return 200 if there are no users', async () => {
      await insertUsers([userOne]);
      const res = await request(app)
        .get(`/ranking/winner`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        users: [],
      });
    });
    test('should return 401 error if access token is missing', async () => {
      await request(app).get(`/ranking/winner`).expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe('GET /ranking/loser', () => {
    test('should return 200 and successfully return the loser', async () => {
      await insertUsers([userOne, winner, loser]);

      const res = await request(app)
        .get(`/ranking/loser`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      const expectedRes = [{ name: 'loser', succes_rate: 0 }];

      expect(res.body.users).toEqual(expectedRes);
    });
    test('should return 200 and successfully return more than one loser if they are tied', async () => {
      await insertUsers([userOne, winner, loser, loser2]);

      const res = await request(app)
        .get(`/ranking/loser`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      const expectedRes = [
        { name: 'loser', succes_rate: 0 },
        { name: 'loser2', succes_rate: 0 },
      ];

      expect(res.body.users).toEqual(expectedRes);
    });
    test('should return 200 if there are no users', async () => {
      await insertUsers([userOne]);
      const res = await request(app)
        .get(`/ranking/loser`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        users: [],
      });
    });
    test('should return 401 error if access token is missing', async () => {
      await request(app).get(`/ranking/loser`).expect(httpStatus.UNAUTHORIZED);
    });
  });
});
