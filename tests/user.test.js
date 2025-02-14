const request = require("supertest");
const app = require("../app");

let token;

describe("User API", () => {
  it("should register a user", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(201);
  });

  it("should login a user", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    token = res.body.token;
  });

  it("should get all users", async () => {
    const res = await request(app).get("/api/users").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});
