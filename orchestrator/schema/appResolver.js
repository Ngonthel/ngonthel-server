const axios = require("axios");

const app_url = process.env.APP_URL || "http://localhost:4001/";

const appResolver = {
  Query: {
    login: async (_, { content }) => {
      try {
        const { data } = await axios.post(app_url + "login", content);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    getUserDetail: async (_, { headers }) => {
      try {
        const { data } = await axios.get(app_url + "users", { headers });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    getHistories: async (_, { headers }) => {
      try {
        const { data } = await axios.get(app_url + "histories", { headers });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    getHistoryDetail: async (_, { id, headers }) => {
      try {
        const { data } = await axios.get(app_url + `histories/${id}`, { headers });
        return data;
      } catch (err) {
        console.log(err);
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
      }
    },
    createHistory: async (_, { headers }) => {
      try {
        const { data } = await axios.post(app_url + "histories", _, { headers });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    updateHistory: async (_, { headers, id, content }) => {
      try {
        const { data } = await axios.put(app_url + `histories/${id}`, content, { headers });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = appResolver;
