const { getDb } = require("../config/config");

class Event {
  static async collection() {
    const db = await getDb();
    const collection = await db.collection("events");
    return collection;
  }

  static async findAll(where) {
    // try {
    const collection = await this.collection();
    const events = await collection.find(where).toArray();
    return events;
    // } catch (err) {
    //   throw err;
    // }
  }

  static async findByPk(id) {
    // try {
    const collection = await this.collection();
    const findEvent = await collection.findOne({ _id: id });
    // if (!findEvent) {
    //   throw { name: "not_found", message: "Error event not found!" };
    // }
    return findEvent;
    // } catch (err) {
    //   throw err;
    // }
  }

  static async create(body) {
    // try {
    const collection = await this.collection();
    const createEvent = await collection.insertOne(body);
    return createEvent;
    // } catch (err) {
    //   throw err;
    // }
  }

  static async update(where, set) {
    // try {
    const collection = await this.collection();
    const updateEvent = await collection.updateOne(where, set);
    return updateEvent;
    // } catch (err) {
    //   throw err;
    // }
  }
}

module.exports = Event;
