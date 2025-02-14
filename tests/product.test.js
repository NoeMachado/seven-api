const request = require("supertest");
const app = require("../app");

let token;
let productId;

describe("Product API", () => {
  beforeAll(async () => {
    const loginRes = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "password123",
    });

    token = loginRes.body.token;
  });

  it("should create a product", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Product",
        description: "This is a test product",
        price: 100,
        stock: 10,
      });

    expect(res.statusCode).toEqual(201);
    productId = res.body.id;
  });

  it("should get all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toEqual(200);
  });

  it("should update a product", async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Product",
        description: "Updated description",
        price: 150,
        stock: 5,
      });

    expect(res.statusCode).toEqual(200);
  });

  it("should delete a product", async () => {
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
});
