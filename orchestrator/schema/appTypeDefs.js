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

  type Query {
    login(content: Login!): Token,
    getUser: UserProfile
  }

  type Mutation {
    register(content: Register!): Message
  }
`;

module.exports = appTypeDefs;
