const appTypeDefs = `#graphql
  type Token {
    access_token: String
  }

  type Message {
    message: String
  }

  type User {
    _id: ID,
    email: String,
    password: String
  }

  type Profile {
    _id: ID,
    userId: ID,
    name: String,
    username: String,
    phoneNumber: String,
    address: String,
    gender: String,
    totalPoint: Int,
    totalDistance: Int,
    totalTime: Int
  }

  type UserProfile {
    user: User,
    profile: Profile
  }

  type History {
    _id: ID,
    userId: ID,
    startDate: String,
    distance: Int,
    avgSpeed: Float,
    caloryBurnt: Float,
    trackLine: [TrackLine],
    endDate: String,
    lastModifies: String
  }

  type TrackLine {
    latitude: String,
    longtitude: String,
    dll: String
  }

  type CreateHistory {
    acknowledged: Boolean,
    insertedId: String
  }

  type UpdateHistory {
    acknowledged: Boolean,
    point: Int,
    date: String,
  }

  type Location {
    altitude: Float,
    longtitude: Float,
    latitude: Float
  }

  type Event {
    _id: ID,
    name: String,
    eventCode: String,
    eventDate: String,
    createdBy: String,
    isActive: Boolean,
    from: Location
    dest: Location
  }

  input Login {
    email: String,
    password: String
  }

  input Register {
    email: String,
    password: String,
    username: String,
    name: String,
    phoneNumber: String,
    address: String,
    gender: String
  }

  input Headers {
    access_token: String
  }

  scalar JSON

  input UpdateData {
    distance: Int,
    avgSpeed: Float,
    time: Int,
    trackLine: [JSON]
  }

  input LocationInput {
    altitude: Float,
    longtitude: Float,
    latitude: Float
  }

  input EventData {
    name: String,
    eventDate: String,
    from: LocationInput,
    dest: LocationInput
  }

  type Query {
    login(content: Login!): Token,
    getUserDetail(headers: Headers!): UserProfile,
    getHistories(headers: Headers!): [History],
    getHistoryDetail(id: ID!, headers: Headers!): History,
    getEvents(headers: Headers!, filter: String): [Event]
    getEventDetail(id: ID!, headers: Headers!): Event
  }

  type Mutation {
    register(content: Register!): Message,
    createHistory(headers: Headers!): CreateHistory,
    updateHistory(id: ID!, headers: Headers!, content: UpdateData): UpdateHistory,
    createEvent(content: EventData!, headers: Headers!): Message,
    patchEvent(id: ID!, headers: Headers!): Message
  }
`;

module.exports = appTypeDefs;
