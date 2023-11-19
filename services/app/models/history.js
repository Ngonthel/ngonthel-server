const { getDb } = require("../config/config");

class History {
  static async collection() {
    const db = await getDb();
    const collection = await db.collection("histories");
    return collection;
  }

  static async findAll(where) {
    try {
      const collection = await this.collection();
      const histories = await collection.find(where).toArray();
      return histories;
    } catch (err) {
      throw err;
    }
  }

  static async create(args) {
    try {
      const collection = await this.collection();
      const history = await collection.insertOne(args);

      return history;
    } catch (err) {
      throw err;
    }
  }

  static async update(where, set) {
    try {
      const collection = await this.collection();
      const history = await collection.updateOne(where, set);

      return history;
    } catch (err) {
      throw err;
    }
  }

  static async findByPk(id) {
    try {
      const collection = await this.collection();
      const history = await collection.findOne({ _id: id });
      if (history) {
        throw { name: "not_found", message: "Error history not found!" };
      }
      return history;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = History;
