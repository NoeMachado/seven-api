const request = require("supertest");
const app = require("../app");

let token;
let orderId;
let productId;

describe("Order API", () => {
  beforeAll(async () => {
    const loginRes = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "password123",
    });

    token = loginRes.body.token;

    const productRes = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Order Test Product",
        description: "Product for order test",
        price: 50,
        stock: 20,
      });

    productId = productRes.body.id;
  });

  it("should create an order", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        products: [{ productId, quantity: 2 }],
      });

    expect(res.statusCode).toEqual(201);
    orderId = res.body.id;
  });

  it("should get user orders", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });

  it("should update order status", async () => {
    const res = await request(app)
      .put(`/api/orders/${orderId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "Processando" });

    expect(res.statusCode).toEqual(200);
  });

  it("should delete an order", async () => {
    const res = await request(app)
      .delete(`/api/orders/${orderId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
});
