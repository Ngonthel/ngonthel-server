const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const History = require("../models/history");
const { connect } = require("../config/config");
const { createToken } = require("../helpers/jwt");
const { ObjectId } = require("mongodb");

const account = {
  email: "admin1@mail.com",
  password: "12345678",
  name: "Admin 1",
  phoneNumber: "081123456789",
  username: "admin1",
  address: "Indonesia",
  gender: "Male",
};

let access_token;
let id;
let historyId;

beforeAll(async () => {
  await connect();
  // login
  const userId = await User.create(account);
  id = userId;
  access_token = createToken({ id });

  // create history
  const history = await History.create({
    userId: new ObjectId(id),
    startDate: new Date(),
    endDate: null,
    time: 0,
    distance: 0,
    avgSpeed: 0,
    point: 0,
    caloryBurnt: 0,
    trackLine: [],
  });

  historyId = history.insertedId;

  await History.update(
    { _id: history.insertedId },
    {
      $set: {
        endDate: new Date(),
        time: 3600,
        distance: 16000,
        avgSpeed: 4.4,
        point: 100,
        caloryBurnt: 1400,
        trackLine: [{ altitude: 0.5, longtitude: 0.5, latitude: 0.5 }],
      },
      $currentDate: { lastModifies: true },
    }
  );
});

afterAll(async () => {
  const userCollection = await User.users();
  await userCollection.drop();
  const profileCollection = await User.profiles();
  await profileCollection.drop();
  const historyCollection = await History.collection();
  await historyCollection.drop();
});

describe("GET /histories", () => {
  it("Should return array of objects (event)", async () => {
    const response = await request(app).get("/histories").set({ access_token });
    console.log(response.body, "RESPONSE BODY");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("userId", expect.any(String));
    expect(response.body[0]).toHaveProperty("startDate", expect.any(String));
    expect(response.body[0]).toHaveProperty("distance", expect.any(Number));
    expect(response.body[0]).toHaveProperty("avgSpeed", expect.any(Number));
    expect(response.body[0]).toHaveProperty("caloryBurnt", expect.any(Number));
    expect(response.body[0]).toHaveProperty("endDate", expect.any(String));
    expect(response.body[0]).toHaveProperty("lastModifies", expect.any(String));
  });

  it("Should fail, if user logged in with fake access_token", async () => {
    const response = await request(app).post("/histories").set({ access_token: "fake-access-token" });
    console.log(response.body, "RESPONSE BODY");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid token!");
  });

  it("Should fail if user is not logged in", async () => {
    const response = await request(app).get("/histories");
    console.log(response.body, "RESPONSE BODY");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid token!");
  });
});

describe("POST /histories", () => {
  it("Should success, if user create history when logged in", async () => {
    const response = await request(app).post("/histories").set({ access_token });
    console.log(response.body, "RESPONSE BODY");

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("acknowledged", true);
    expect(response.body).toHaveProperty("insertedId", expect.any(String));
  });

  it("Should fail, if user logged in with fake access_token", async () => {
    const response = await request(app).post("/histories").set({ access_token: "fake-access-token" });
    console.log(response.body, "RESPONSE BODY");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid token!");
  });

  it("Should fail if user is not logged in", async () => {
    const response = await request(app).post("/histories");
    console.log(response.body, "RESPONSE BODY");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid token!");
  });
});

describe("PUT /histories/:id", () => {
  it("Should success, if history correctly filled", async () => {
    const body = {
      time: 7200,
      distance: 32000,
      avgSpeed: 4.4,
      trackLine: [{ altitude: 0.9, longtitude: 0.9, latitude: 0.9 }],
    };

    const response = await request(app).put(`/histories/${historyId}`).send(body).set({ access_token });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("acknowledged", true);
    expect(response.body).toHaveProperty("point", expect.any(Number));
    expect(response.body).toHaveProperty("time", expect.any(String));
  });

  it("Should fail, if history id is not found", async () => {
    const body = {
      time: 7200,
      distance: 32000,
      avgSpeed: 4.4,
      trackLine: [{ altitude: 0.9, longtitude: 0.9, latitude: 0.9 }],
    };

    const response = await request(app).put(`/histories/123456789012345678901234`).send(body).set({ access_token });
    console.log(response.body);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Error history not found");
  });

  it("Should fail, if time is not provided", async () => {
    const body = {
      distance: 32000,
      avgSpeed: 4.4,
      trackLine: [{ altitude: 0.9, longtitude: 0.9, latitude: 0.9 }],
    };

    const response = await request(app).put(`/histories/${historyId}`).send(body).set({ access_token });
    console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Time is required!");
  });

  it("Should fail, if distance is not provided", async () => {
    const body = {
      time: 7200,
      avgSpeed: 4.4,
      trackLine: [{ altitude: 0.9, longtitude: 0.9, latitude: 0.9 }],
    };

    const response = await request(app).put(`/histories/${historyId}`).send(body).set({ access_token });
    console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Distance is required!");
  });

  it("Should fail, if average speed is not provided", async () => {
    const body = {
      time: 7200,
      distance: 32000,
      trackLine: [{ altitude: 0.9, longtitude: 0.9, latitude: 0.9 }],
    };

    const response = await request(app).put(`/histories/${historyId}`).send(body).set({ access_token });
    console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Average speed is required!");
  });

  it("Should fail, if track line is not provided", async () => {
    const body = {
      time: 7200,
      distance: 32000,
      avgSpeed: 4.4,
    };

    const response = await request(app).put(`/histories/${historyId}`).send(body).set({ access_token });
    console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Track line is required!");
  });

  it("Should fail, if the updated id does not match BSON type ID", async () => {
    const body = {
      time: 7200,
      distance: 32000,
      avgSpeed: 4.4,
      trackLine: [{ altitude: 0.9, longtitude: 0.9, latitude: 0.9 }],
    };

    const response = await request(app).put(`/histories/sadlfjkh1012`).send(body).set({ access_token });
    console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "input must be a 24 character hex string, 12 byte Uint8Array, or an integer");
  });
});

describe("GET /histories/:id", () => {
  it("Should success, if the searched id is exists", async () => {
    const response = await request(app).get(`/histories/${historyId}`).set({ access_token });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("_id", expect.any(String));
    expect(response.body).toHaveProperty("userId", expect.any(String));
    expect(response.body).toHaveProperty("startDate", expect.any(String));
    expect(response.body).toHaveProperty("endDate", expect.any(String));
    expect(response.body).toHaveProperty("time", expect.any(Number));
    expect(response.body).toHaveProperty("distance", expect.any(Number));
    expect(response.body).toHaveProperty("avgSpeed", expect.any(Number));
    expect(response.body).toHaveProperty("point", expect.any(Number));
    expect(response.body).toHaveProperty("caloryBurnt", expect.any(Number));
    expect(response.body).toHaveProperty("trackLine", expect.any(Array));
    expect(response.body.trackLine[0]).toBeInstanceOf(Object);
    expect(response.body.trackLine[0]).toHaveProperty("altitude", expect.any(Number));
    expect(response.body.trackLine[0]).toHaveProperty("longtitude", expect.any(Number));
    expect(response.body.trackLine[0]).toHaveProperty("latitude", expect.any(Number));
  });

  it("Should fail, if the searched id is exists, but the user is not logged in", async () => {
    const response = await request(app).get(`/histories/${historyId}`);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid token!");
  });

  it("Should fail, if the searched id is not exists", async () => {
    const response = await request(app).get(`/histories/123456789012345678901234`).set({ access_token });
    console.log(response.body);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Error history not found!");
  });

  it("Should fail, if the id searched does not match BSON type ID", async () => {
    const response = await request(app).get(`/histories/skdj13`).set({ access_token });
    console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "input must be a 24 character hex string, 12 byte Uint8Array, or an integer");
  });
});
