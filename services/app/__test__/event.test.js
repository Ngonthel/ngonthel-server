const request = require("supertest");
const app = require("../app");
const Profile = require("../models/profile");
const User = require("../models/user");
const { connect, getDb } = require("../config/config");
const { createToken } = require("../helpers/jwt");
const Event = require("../models/event");
let access_token;
let eventId;

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
  access_token = createToken({ id: String(dataUserCreate.insertedId) });
});

afterAll(async () => {
  const userCollection = await User.users();
  await userCollection.drop();
  const eventCollection = await Event.collection();
  await eventCollection.drop();
});

describe("POST /events", () => {
  it("success", () => {
    return request(app)
      .post("/events")
      .send({
        dest: {
          altitude: 1,
          latitude: 1,
          longtitude: 1,
        },
        eventDate: new Date(),
        from: {
          altitude: 1,
          latitude: 1,
          longtitude: 1,
        },
        name: "galang ganteng",
      })
      .set({
        access_token,
      })
      .then((response) => {
        const data = response["_body"];
        expect(response.status).toBe(201);
        expect(data).toBeInstanceOf(Object);
        expect(data).toHaveProperty("message", expect.any(String));
        expect(data).toHaveProperty("eventId", expect.any(String));
        eventId = data.eventId;
      });
  });
});

describe("POST /events", () => {
  it("error null name", () => {
    return request(app)
      .post("/events")
      .send({
        dest: {
          altitude: 1,
          latitude: 1,
          longtitude: 1,
        },
        eventDate: new Date(),
        from: {
          altitude: 1,
          latitude: 1,
          longtitude: 1,
        },
        name: null,
      })
      .set({
        access_token,
      })
      .then((response) => {
        const data = response["_body"];
        expect(response.status).toBe(400);
        expect(data).toBeInstanceOf(Object);
        expect(data).toHaveProperty("message", "required data");
      });
  });
});
describe("POST /events", () => {
  it("error null from", () => {
    return request(app)
      .post("/events")
      .send({
        dest: {
          altitude: 1,
          latitude: 1,
          longtitude: 1,
        },
        eventDate: new Date(),
        from: {
          altitude: null,
          latitude: null,
          longtitude: null,
        },
        name: "galang ganteng",
      })
      .set({
        access_token,
      })
      .then((response) => {
        const data = response["_body"];
        expect(response.status).toBe(400);
        expect(data).toBeInstanceOf(Object);
        expect(data).toHaveProperty("message", "required data");
      });
  });
});
describe("POST /events", () => {
  it("error null dest", () => {
    return request(app)
      .post("/events")
      .send({
        dest: {
          altitude: null,
          latitude: null,
          longtitude: null,
        },
        eventDate: new Date(),
        from: {
          altitude: 1,
          latitude: 1,
          longtitude: 1,
        },
        name: "galang ganteng",
      })
      .set({
        access_token,
      })
      .then((response) => {
        const data = response["_body"];
        expect(response.status).toBe(400);
        expect(data).toBeInstanceOf(Object);
        expect(data).toHaveProperty("message", "required data");
      });
  });
});
describe("POST /events", () => {
  it("error null from", () => {
    return request(app)
      .post("/events")
      .send({
        dest: {
          altitude: 1,
          latitude: 1,
          longtitude: 1,
        },
        eventDate: new Date(),
        from: {
          altitude: null,
          latitude: null,
          longtitude: null,
        },
        name: "galang ganteng",
      })
      .set({
        access_token,
      })
      .then((response) => {
        const data = response["_body"];
        expect(response.status).toBe(400);
        expect(data).toBeInstanceOf(Object);
        expect(data).toHaveProperty("message", "required data");
      });
  });
});

describe("POST /events", () => {
  it("error null eventDate", () => {
    return request(app)
      .post("/events")
      .send({
        dest: {
          altitude: 1,
          latitude: 1,
          longtitude: 1,
        },
        eventDate: null,
        from: {
          altitude: 1,
          latitude: 1,
          longtitude: 1,
        },
        name: "galang ganteng",
      })
      .set({
        access_token,
      })
      .then((response) => {
        const data = response["_body"];
        expect(response.status).toBe(400);
        expect(data).toBeInstanceOf(Object);
        expect(data).toHaveProperty("message", "required data");
      });
  });
});

describe("GET /events/params", () => {
  it("success", () => {
    return request(app)
      .get(`/events/${eventId}`)
      .set({
        access_token,
      })
      .then((response) => {
        const data = response["_body"];
        expect(response.status).toBe(200);
        expect(data).toHaveProperty("_id", eventId);
        expect(data).toHaveProperty("name", expect.any(String));
        expect(data).toHaveProperty("eventCode", expect.any(String));
        expect(data).toHaveProperty("eventDate", expect.any(String));
        expect(data).toHaveProperty("createdBy", expect.any(String));
        expect(data).toHaveProperty("isActive", expect.any(Boolean));
        expect(data).toHaveProperty("from", expect.any(Object));
        expect(data).toHaveProperty("dest", expect.any(Object));
      });
  });
});
describe("GET /events/params", () => {
  it("failed", () => {
    return request(app)
      .get(`/events/p`)
      .set({
        access_token,
      })
      .then((response) => {
        const data = response["_body"];
        expect(response.status).toBe(400);
        expect(data).toBeInstanceOf(Object);
        expect(data).toHaveProperty("message", "input must be a 24 character hex string, 12 byte Uint8Array, or an integer");
      });
  });
});

describe("GET /events/?filter=query", () => {
  it("success", () => {
    return request(app)
      .get(`/events/?filter=active`)
      .set({
        access_token,
      })
      .then((response) => {
        const data = response["_body"];
        expect(response.status).toBe(200);
        expect(data).toBeInstanceOf(Array);
      });
  });
});

describe("GET /events/?filter=query", () => {
  it("failed query availabel", () => {
    return request(app)
      .get(`/events/?filter=p`)
      .set({
        access_token,
      })
      .then((response) => {
        const data = response["_body"];
        expect(response.status).toBe(400);
        expect(data).toBeInstanceOf(Object);
        expect(data).toHaveProperty("message", "query cannot availabel");
      });
  });
});

describe("GET /events/?filter=query", () => {
  it("failed query null", () => {
    return request(app)
      .get(`/events/?filter`)
      .set({
        access_token,
      })
      .then((response) => {
        const data = response["_body"];
        expect(response.status).toBe(400);
        expect(data).toBeInstanceOf(Object);
        expect(data).toHaveProperty("message", "query cannot null");
      });
  });
});

describe("PATCH /events/params", () => {
  it("success", () => {
    return request(app)
      .patch(`/events/${eventId}`)
      .set({
        access_token,
      })
      .then((response) => {
        const data = response["_body"];
        expect(response.status).toBe(200);
        expect(data).toHaveProperty("message", `Event with id "${eventId}" set to inactive!`);
      });
  });
});

describe("PATCH /events/params", () => {
  it("failed query availabel", () => {
    return request(app)
      .patch(`/events/p`)
      .set({
        access_token,
      })
      .then((response) => {
        const data = response["_body"];
        expect(response.status).toBe(400);
        expect(data).toBeInstanceOf(Object);
        expect(data).toHaveProperty("message", "input must be a 24 character hex string, 12 byte Uint8Array, or an integer");
      });
  });
});
