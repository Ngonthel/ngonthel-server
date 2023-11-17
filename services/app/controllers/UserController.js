const { verifyPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const User = require("../models/user");
const Profile = require("../models/profile");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne(email);
      if (!findUser) {
        throw { name: "auth_error", message: "Invalid Email / Password!" };
      }

      const isPasswordValid = verifyPassword(password, findUser.password);
      if (!isPasswordValid) {
        throw { name: "auth_error", message: "Invalid Email / Password!" };
      }
      const username = await Profile.findByPk(findUser._id);

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
      res.status(200).send({ message: "New user created successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async google(req, res, next) {
    try {
      //
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
