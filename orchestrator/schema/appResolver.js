const axios = require("axios");
const { GraphQLError } = require("graphql");

const app_url = process.env.APP_URL || "http://localhost:4001/";

const appResolver = {
  Query: {
    login: async (_, { content }) => {
      try {
        const { data } = await axios.post(app_url + "login", content);
        return data;
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
    getUserDetail: async (_, { headers }) => {
      try {
        const { data } = await axios.get(app_url + "users", { headers });
        return data;
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
    getHistories: async (_, { headers }) => {
      try {
        const { data } = await axios.get(app_url + "histories", { headers });
        return data;
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
    getHistoryDetail: async (_, { id, headers }) => {
      try {
        const { data } = await axios.get(app_url + `histories/${id}`, { headers });
        return data;
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
    getEvents: async (_, { headers, filter }) => {
      try {
        const { data } = await axios.get(app_url + `events?filter=${filter}`, { headers });
        return data;
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
    getEventDetail: async (_, { id, headers }) => {
      try {
        const { data } = await axios.get(app_url + `events/${id}`, { headers });
        return data;
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
  },
  Mutation: {
    register: async (_, { content }) => {
      try {
        const { data } = await axios.post(app_url + "register", content);
        return data;
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
    createHistory: async (_, { headers }) => {
      try {
        const { data } = await axios.post(app_url + "histories", _, { headers });
        return data;
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
    updateHistory: async (_, { headers, id, content }) => {
      try {
        const { data } = await axios.put(app_url + `histories/${id}`, content, { headers });
        return data;
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
    createEvent: async (_, { content, headers }) => {
      try {
        const { data } = await axios.post(app_url + "events", content, { headers });
        return data;
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
    patchEvent: async (_, { id, headers }) => {
      try {
        const { data } = await axios.patch(app_url + `events/${id}`, _, { headers });
        return data;
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
  },
};

module.exports = appResolver;
