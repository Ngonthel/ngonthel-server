const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri);

let db;

const connect = async () => {
  try {
    await client.connect();
    db = client.db("ngontheldb");

    console.log("Connected successfully to server");
  } catch (error) {
    console.log(`Error connect config/config.js:`, err);
  }
};

const getDb = () => {
  return db;
};

module.exports = { connect, getDb };
