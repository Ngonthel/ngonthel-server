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
    avgSpeed: Int,
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
    modifiedCount: Int,
    upsertedId: ID,
    upsertedCount: Int,
    matchedCount: Int
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
    avgSpeed: Int,
    time: Int,
    trackLine: [JSON]
  }

  type Query {
    login(content: Login!): Token,
    getUserDetail(headers: Headers!): UserProfile,
    getHistories(headers: Headers!): [History],
    getHistoryDetail(headers: Headers!, id: ID!): History
  }

  type Mutation {
    register(content: Register!): Message,
    createHistory(headers: Headers!): CreateHistory,
    updateHistory(id: ID!, headers: Headers!, content: UpdateData): UpdateHistory
  }
`;

module.exports = appTypeDefs;
