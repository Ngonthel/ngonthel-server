const appTypeDefs = `#graphql
  type Token {
    access_token: String
  }

  type Message {
    message: String
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
    login(content: Login!): Token
  }

  type Mutation {
    register(content: Register!): Message
  }
`;

module.exports = appTypeDefs;
