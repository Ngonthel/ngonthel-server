const { verifyPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const User = require("../models/user");
const Profile = require("../models/profile");
const { ObjectId } = require("mongodb");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "validation_error", message: "Email is required!" };
      }
      if (!password) {
        throw { name: "validation_error", message: "Password is required!" };
      }

      const findUser = await User.findOne(email);

      const isPasswordValid = verifyPassword(password, findUser.password);
      if (!isPasswordValid) {
        throw { name: "auth_error", message: "Invalid Email / Password!" };
      }
      const username = await Profile.findOne({ userId: findUser._id });

      const payload = {
        id: findUser._id,
        username,
      };
      const access_token = createToken(payload);
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      await User.create(req.body);
      res.status(201).send({ message: "New user created successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    // try {
    const { id } = req.user;

    const user = await User.findByPk(id);
    const profile = await Profile.findOne({ userId: user._id });

    res.status(200).json({ user, profile });
    // } catch (err) {
    //   next(err);
    // }
  }
}

module.exports = UserController;
