const appTypeDefs = `#graphql
  type Test {
    id: ID
    test: String
  }

  type Query {
    test: Test
  }

  type Mutation {
    test: Test
  }
`;

module.exports = appTypeDefs;
