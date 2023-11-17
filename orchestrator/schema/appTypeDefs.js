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

  input Login {
    email: String,
    password: String
  }

  input Register {
    email: String,
    password: String,
    username: String,
    phoneNumber: String,
    address: String
  }

  input Headers {
    access_token: String
  }

  type Query {
    login(content: Login!): Token,
    getUserDetail(headers: Headers!): UserProfile,
    getHistories(headers: Headers!): [History],
    getHistoryDetail(headers: Headers!, id: ID!): History
  }

  type Mutation {
    register(content: Register!): Message
  }
`;

module.exports = appTypeDefs;
