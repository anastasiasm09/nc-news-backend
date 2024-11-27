const endpointsJson = require('../endpoints.json');
const data = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const db = require('../db/connection');
const app = require('../app');
const request = require('supertest');


beforeEach(() => seed(data));
afterAll(() => db.end());


describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: returns an array of all of topics object", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({body}) => {
      const { topics } = body;
      expect(Array.isArray(topics)).toBe(true);
      expect(topics).toHaveLength(3)
      topics.forEach((obj) => {
        expect(obj).toMatchObject({
          slug: expect.any(String),
          description: expect.any(String),
        });
      });
    });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: returns the correct article object when valid article_id provided", () => {
    return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
            expect(body.article).toEqual({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2020-07-09T20:11:00.000Z",
                votes: 100,
                article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
            });
        });
  });
  test("400: response with an error message for an invalid article type", () => {
    return request(app)
      .get("/api/articles/not-a-number")
      .expect(400)
      .then(({ body }) => {
        const {msg} = body
        expect(msg).toBe("Invalid data type");
      });
  });
  test("404: responds with 'Article not found' when article_id does not exist", () => {
    return request(app)
      .get("/api/articles/99999")
      .expect(404)
      .then(({ body }) => {
        const {msg} = body
        expect(msg).toBe("Article not found");
      });
  });
})
