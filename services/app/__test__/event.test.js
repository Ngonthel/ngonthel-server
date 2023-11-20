const request = require('supertest');
const app = require('../app')
const Profile = require('../models/profile');
const User = require('../models/user')
const { connect , getDb } = require('../config/config')
const { createToken } = require("../helpers/jwt");
const Event = require('../models/event');
let access_token;
const account = {
    email: "admin2@mail.com",
    password: "12345678",
    name: "Admin 2",
    phoneNumber: "081123456789",
    username: "admin2",
    address: "Indonesia",
    gender: "Male",
};
  
beforeAll(async () => {
    await connect();
    const dataUserCreate = await User.create(account);
    access_token = createToken(String(dataUserCreate.insertedId))
});

afterAll(async () => {
    const userCollection = await User.users()
    await userCollection.drop()
    const eventCollection = await Event.collection()
    await eventCollection.drop()
});

describe("POST /events", () => {
    it("success", () => {
        return  request(app)
                .post('/events')
                .send({
                    "dest": {
                      "altitude": 1,
                      "latitude": 1,
                      "longtitude": 1
                    },
                    "eventDate": new Date(),
                    "from": {
                        "altitude": 1,
                        "latitude": 1,
                        "longtitude": 1
                    },
                    "name": "galang ganteng"
                })
                .set({
                    access_token
                })
                .then((response)=>{
                    const data = response["_body"]
                    expect(response.status).toBe(201);
                    expect(data).toBeInstanceOf(Object);
                    expect(data).toHaveProperty("message", expect.any(String));
                })
    })
})

describe("POST /events", () => {
    it("error null name", () => {
        return  request(app)
                .post('/events')
                .send({
                    "dest": {
                      "altitude": 1,
                      "latitude": 1,
                      "longtitude": 1
                    },
                    "eventDate": new Date(),
                    "from": {
                        "altitude": 1,
                        "latitude": 1,
                        "longtitude": 1
                    },
                    "name": null
                })
                .set({
                    access_token
                })
                .then((response)=>{
                    const data = response["_body"]
                    expect(response.status).toBe(400);
                    expect(data).toBeInstanceOf(Object);
                    expect(data).toHaveProperty("message", "required data");
                })
    })
})
describe("POST /events", () => {
    it("error null from", () => {
        return  request(app)
                .post('/events')
                .send({
                    "dest": {
                      "altitude": 1,
                      "latitude": 1,
                      "longtitude": 1
                    },
                    "eventDate": new Date(),
                    "from": {
                        "altitude": null,
                        "latitude": null,
                        "longtitude": null
                    },
                    "name": "galang ganteng"
                })
                .set({
                    access_token
                })
                .then((response)=>{
                    const data = response["_body"]
                    expect(response.status).toBe(400);
                    expect(data).toBeInstanceOf(Object);
                    expect(data).toHaveProperty("message", "required data");
                })
    })
})
describe("POST /events", () => {
    it("error null dest", () => {
        return  request(app)
                .post('/events')
                .send({
                    "dest": {
                      "altitude": null,
                      "latitude": null,
                      "longtitude": null
                    },
                    "eventDate": new Date(),
                    "from": {
                        "altitude": 1,
                        "latitude": 1,
                        "longtitude": 1
                    },
                    "name": "galang ganteng"
                })
                .set({
                    access_token
                })
                .then((response)=>{
                    const data = response["_body"]
                    expect(response.status).toBe(400);
                    expect(data).toBeInstanceOf(Object);
                    expect(data).toHaveProperty("message", "required data");
                })
    })
})
describe("POST /events", () => {
    it("error null dest", () => {
        return  request(app)
                .post('/events')
                .send({
                    "dest": {
                      "altitude": 1,
                      "latitude": 1,
                      "longtitude": 1
                    },
                    "eventDate": null,
                    "from": {
                        "altitude": 1,
                        "latitude": 1,
                        "longtitude": 1
                    },
                    "name": "galang ganteng"
                })
                .set({
                    access_token
                })
                .then((response)=>{
                    const data = response["_body"]
                    expect(response.status).toBe(400);
                    expect(data).toBeInstanceOf(Object);
                    expect(data).toHaveProperty("message", "required data");
                })
    })
})