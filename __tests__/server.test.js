const request = require('supertest');

const app = require('../server/index.js');

describe('GET /ingredients', () => {
  test('should respond with status code 200', (done) => {
    request(app).get('/ingredients').then(res => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  test('should respond with an object', (done) => {
    request(app).get('/ingredients').then(res => {
      expect(typeof res.body).toBe('object');
      expect(Array.isArray(res.body)).toBe(false);
      done();
    });
  });
});

describe('POST /drinksByIngredient', () => {
  let ingredients;
  beforeAll(() => ingredients = { 'Dark rum': 1, 'Light rum': 1, 'Orange juice': 1, 'Vodka': 1 });

  test('should respond with status code 200', (done) => {
    request(app).post('/drinksByIngredient').send(ingredients)
      .then(res => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  test('should respond with an array', (done) => {
    request(app).post('/drinksByIngredient').send(ingredients)
      .then(res => {
        expect(Array.isArray(res.body)).toBe(true);
        done();
      });
  });
});