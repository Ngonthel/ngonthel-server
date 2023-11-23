const { getDb } = require("../config/config");
const { ObjectId } = require("mongodb");

class Profile {
  static async profiles() {
    const db = await getDb();
    const collection = await db.collection("profiles");
    return collection;
  }

  static async findOne(userId) {
    // try {
    const collection = await this.profiles();
    const findProfile = await collection.findOne(userId);
    return findProfile;
    // } catch (err) {
    //   throw err;
    // }
  }

  static async update(userId, set) {
    // try {
    const collection = await this.profiles();
    const profile = await collection.updateOne({ userId: new ObjectId(userId) }, { $set: set });

    return profile;
    // } catch (err) {
    //   throw err;
    // }
  }

  static async findAll() {
    // try {
    const collection = await this.profiles();
    const leaderboard = await collection.find().sort({ totalPoint: -1 }).toArray();
    return leaderboard;
    // } catch (err) {
    //   throw err;
    // }
  }
}

module.exports = Profile;
