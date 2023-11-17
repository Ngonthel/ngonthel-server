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
    getUser: async (pertama, kedua, ketiga, keempat) => {
      try {
        // console.log({ pertama, kedua, ketiga, keempat });
        // const { data } = await axios.get(app_url + "users");
        return "data";
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
  },
};

module.exports = appResolver;
