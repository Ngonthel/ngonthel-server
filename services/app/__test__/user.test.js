const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { connect } = require("../config/config");

const account = {
  email: "admin1@mail.com",
  password: "12345678",
  name: "Admin 1",
  phoneNumber: "081123456789",
  username: "admin1",
  address: "Indonesia",
  gender: "Male",
};

beforeAll(async () => {
  await connect();
  await User.create(account);
});

afterAll(async () => {
  const userCollection = await User.users();
  await userCollection.drop();
  const profileCollection = await User.profiles();
  await profileCollection.drop();
});

describe("POST /login", () => {
  it("Should return access token, if email and password valid", async () => {
    const body = {
      email: account.email,
      password: account.password,
    };
    const response = await request(app).post("/login").send(body);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  it("Should fail if email is wrong", async () => {
    const body = {
      email: "adsfj@mail.casd",
      password: account.password,
    };
    const response = await request(app).post("/login").send(body);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Email / Password!");
  });

  it("Should fail if password is wrong", async () => {
    const body = {
      email: account.email,
      password: "sadfkj",
    };
    const response = await request(app).post("/login").send(body);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Email / Password!");
  });

  it("Should fail if email is not provided", async () => {
    const body = {
      password: account.password,
    };
    const response = await request(app).post("/login").send(body);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required!");
  });

  it("Should fail if password is not provided", async () => {
    const body = {
      email: account.email,
    };
    const response = await request(app).post("/login").send(body);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required!");
  });
});

describe("POST /register", () => {
  it("Should success, if the registration form is filled in correctly", async () => {
    const register = {
      email: "admin2@mail.com",
      password: "12345678",
      name: "Admin 2",
      phoneNumber: "081123456789",
      username: "admin2",
      address: "Indonesia",
      gender: "Male",
    };

    const response = await request(app).post("/register").send(register);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "New user created successfully!");
  });

  it("Should fail, if the email is already taken", async () => {
    const register = {
      email: "admin1@mail.com",
      password: "12345678",
      name: "Admin 2",
      phoneNumber: "081123456789",
      username: "admin2",
      address: "Indonesia",
      gender: "Male",
    };

    const response = await request(app).post("/register").send(register);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is already taken!");
  });

  it("Should fail, if email is not provided", async () => {
    const register = {
      password: "12345678",
      name: "Admin 2",
      phoneNumber: "081123456789",
      username: "admin2",
      address: "Indonesia",
      gender: "Male",
    };

    const response = await request(app).post("/register").send(register);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required!");
  });

  it("Should fail, if password length is less than 8", async () => {
    const register = {
      email: "admin3@mail.com",
      password: "1234",
      name: "Admin 3",
      phoneNumber: "081123456789",
      username: "admin3",
      address: "Indonesia",
      gender: "Male",
    };

    const response = await request(app).post("/register").send(register);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Minimum length of password is 8");
  });

  it("Should fail, if password is not provided", async () => {
    const register = {
      email: "admin3@mail.com",
      name: "Admin 3",
      phoneNumber: "081123456789",
      username: "admin3",
      address: "Indonesia",
      gender: "Male",
    };

    const response = await request(app).post("/register").send(register);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required!");
  });
});
