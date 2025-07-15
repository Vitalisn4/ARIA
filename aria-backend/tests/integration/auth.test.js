const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const User = require("../../models/userModel");

describe("Auth API Endpoints", () => {
  beforeAll(async () => {
    // Use a separate test DB
    const uri = process.env.MONGO_URI_TEST;
    if (!uri) throw new Error("MONGO_URI_TEST not defined");
    await mongoose.connect(uri);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("POST /api/auth/register - should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@example.com",
        password: "password123",
        profile: { firstName: "Test", lastName: "User" },
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("POST /api/auth/register - should fail if user already exists", async () => {
    // Create user first
    await User.create({
      email: "test@example.com",
      password: "password123",
      profile: { firstName: "Test", lastName: "User" },
    });

    // Attempt to create again
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@example.com",
        password: "password123",
        profile: { firstName: "Test", lastName: "User" },
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe("User already exists");
  });
});
