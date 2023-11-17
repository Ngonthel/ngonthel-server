const { getDb } = require("../config/config");
const { ObjectId } = require("mongodb");

class User {
  static async profiles() {
    const db = await getDb();
    const collection = await db.collection("profiles");
    return collection;
  }

  static async findByPk(id) {
    try {
      const collection = await this.profiles();
      const findProfile = await collection.findOne({ userId: id });

      return findProfile;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
