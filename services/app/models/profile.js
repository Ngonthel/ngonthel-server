const { getDb } = require("../config/config");

class Profile {
  static async profiles() {
    const db = await getDb();
    const collection = await db.collection("profiles");
    return collection;
  }

  static async create(args) {
    try {
      const collection = await this.profiles();
      const profile = await collection.insertOne(args);

      return profile;
    } catch (err) {
      throw err;
    }
  }

  static async findOne(userId) {
    try {
      const collection = await this.profiles();
      const findProfile = await collection.findOne({ userId });

      return findProfile;
    } catch (err) {
      throw err;
    }
  }

  static async update(where, set) {
    try {
      const collection = await this.profiles();
      const profile = await collection.updateOne(where, { $set: set });

      return profile;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Profile;
