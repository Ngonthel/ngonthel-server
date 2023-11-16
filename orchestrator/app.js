const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const appTypeDefs = require("./schema/appTypeDefs");
const appResolver = require("./schema/appResolver");

const server = new ApolloServer({
  typeDefs: appTypeDefs,
  resolvers: appResolver,
  instropection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
