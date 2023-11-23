const { MongoClient } = require("mongodb");

// const uri = process.env.DATABASE_URL;
const uri = "mongodb+srv://tumballast:VDrQnyCe7ab71MUm@cluster0.5oavjdn.mongodb.net/"; // link testing

const client = new MongoClient(uri);

let db;

const connect = async () => {
  try {
    await client.connect();
    db = client.db("ngontheldb");

    // console.log("Connected successfully to mongo server");
  } catch (err) {
    // console.log(`Error connect config/config.js:`, err);
  }
};

const getDb = () => {
  return db;
};

module.exports = { connect, getDb };
