const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { connect, getDb } = require("../config/config");
const { createToken } = require("../helpers/jwt");
let access_token;

const account1 = {
  email: "admin1@mail.com",
  password: "12345678",
  name: "Admin 1",
  phoneNumber: "081123456789",
  username: "admin1",
  address: "Indonesia",
  gender: "Male",
};
const account2 = {
  email: "admin2@mail.com",
  password: "12345678",
  name: "Admin 2",
  phoneNumber: "081123456789",
  username: "admin2",
  address: "Indonesia",
  gender: "Male",
};
const account3 = {
  email: "admin3@mail.com",
  password: "12345678",
  name: "Admin 3",
  phoneNumber: "081123456789",
  username: "admin3",
  address: "Indonesia",
  gender: "Male",
};

beforeAll(async () => {
  await connect();
  await User.create(account1);
  await User.create(account2);
  const dataUserCreate = await User.create(account3);
  access_token = createToken({ id: String(dataUserCreate.insertedId) });
});

afterAll(async () => {
  const userCollection = await User.users();
  await userCollection.drop();
});

describe("GET /leaderboard", () => {
  it("success", () => {
    return request(app)
      .get(`/leaderboard`)
      .set({
        access_token,
      })
      .then((response) => {
        const data = response["_body"];
        expect(response.status).toBe(200);
        expect(data[0]).toHaveProperty("_id", expect.any(String));
        expect(data[0]).toHaveProperty("userId", expect.any(String));
        expect(data[0]).toHaveProperty("name", expect.any(String));
        expect(data[0]).toHaveProperty("username", expect.any(String));
        expect(data[0]).toHaveProperty("phoneNumber", expect.any(String));
        expect(data[0]).toHaveProperty("address", expect.any(String));
        expect(data[0]).toHaveProperty("gender", expect.any(String));
        expect(data[0]).toHaveProperty("totalPoint", expect.any(Number));
        expect(data[0]).toHaveProperty("totalDistance", expect.any(Number));
        expect(data[0]).toHaveProperty("totalTime", expect.any(Number));
      });
  });
});

describe("GET /leaderboard", () => {
  it("faield no have auth", () => {
    return request(app)
      .get(`/leaderboard`)
      .then((response) => {
        const data = response["_body"];
        expect(response.status).toBe(401);
        expect(data).toHaveProperty("message", "Invalid token!");
      });
  });
});
