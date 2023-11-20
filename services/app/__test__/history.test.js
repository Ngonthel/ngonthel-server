// const request = require("supertest");
// const app = require("../app");
// const User = require("../models/user");
// const History = require("../models/history");
// const { connect } = require("../config/config");
// const UserController = require("../controllers/UserController");

// const account = {
//   email: "admin1@mail.com",
//   password: "12345678",
//   name: "Admin 1",
//   phoneNumber: "081123456789",
//   username: "admin1",
//   address: "Indonesia",
//   gender: "Male",
// };

// let access_token;

// beforeAll(async () => {0
//   await connect();
//   await User.create(account);
// });

// afterAll(async () => {
//   const userCollection = await User.users();
//   await userCollection.drop();
//   const profileCollection = await User.profiles();
//   await profileCollection.drop();
// });
