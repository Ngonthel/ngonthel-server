const { getDb } = require("../config/config");
const { hashPassword } = require("../helpers/bcrypt");

class User {
  static async users() {
    const db = await getDb();
    const collection = await db.collection("users");
    return collection;
  }

  static async profiles() {
    const db = await getDb();
    const collection = await db.collection("profiles");
    return collection;
  }

  static async create({ name, email, password, username, phoneNumber, address, gender }) {
    try {
      // Form validation
      if (!email) {
        throw { name: "validation_error", message: "Email is required!" };
      } else if (!password) {
        throw { name: "validation_error", message: "Password is required!" };
      } else if (password && password.length < 8) {
        throw { name: "validation_error", message: "Minimum length of password is 8" };
      } else if (!username) {
        throw { name: "validation_error", message: "Username is required" };
      }

      const userCollection = await this.users();
      const isEmailExists = (await userCollection.findOne({ email })) ? true : false;

      // Check that email is unique or not
      if (isEmailExists) {
        throw { name: "validation_error", message: "Email is already taken!" };
      }

      const hashedPassword = hashPassword(password);
      const newUser = await userCollection.insertOne({ email, password: hashedPassword });

      const profileCollection = await this.profiles();
      await profileCollection.insertOne({
        userId: newUser.insertedId,
        name,
        username,
        phoneNumber,
        address,
        gender,
        totalPoint: 0,
        totalDistance: 0,
        totalTime: 0,
      });
    } catch (err) {
      throw err;
    }
  }

  static async findOne(email) {
    try {
      const collection = await this.users();
      const findUserByEmail = await collection.findOne({ email });

      return findUserByEmail;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
